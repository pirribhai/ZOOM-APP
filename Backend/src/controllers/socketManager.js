// Purpose: Manage all real-time communication between users.


// import { connections } from "mongoose";
import { Server } from "socket.io";

let connections ={};     //which user is i which room
let messages ={};        //store chat history of each room
let timeOnline ={};       //stores socketId(username) and joining time and current time of disconnecting meeting

export const connectToSocket = (server) => {  //server is just an object which handles all the small functions like emit , on , close.
    
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET" , "POST"],
            allowedHeaders:["*"],
            credentials:true
        }
    });

  io.on("connection",(socket)=>{   //on-> listen the event  ; socket->like socketId(username)
       console.log("SOMETHING CONNECTED");
       
    socket.on("join-call",(path)=>{  //path is meeting id
        if(connections[path]=== undefined){  // if meeting123 not exist then...
            connections[path]=[]
        }
        connections[path].push(socket.id) //add current user's socketId on  the room 

        timeOnline[socket.id] = new Date(); //saves joining time of user

        for(let a=0;a<connections[path].length;a++){  //Meeting me jitne users hain un sab par loop chalao. path stores meetingId
            io.to(connections[path][a]).emit("user-joined",socket.id, connections[path]);// if a new user joined then a message "user-joined" goes to all others of the meeting with his id. to->sends message to specific user
        }

        if(messages[path] !== undefined){ //if old chat exists then show it to the new user too
            for (let a=0;a<messages[path].length;++a){
                io.to(socket.id).emit("chat-message" , messages[path][a]['data'], //sends the previous chat only to the new user
                    messages[path][a]['sender'], messages[path][a]['socket-id-sender']
                )
            }
        }
    })

    //Yahan se WebRTC aur Live Chat start hoti hai.
   socket.on("signal",(toId,message)=>{   //Direct User A → User B connection banaane ke liye id and message needed hota hai
       io.to(toId).emit("signal",socket.id , message); // Server signal ko sirf us user ko bhejta hai jiski socket id milti hai
   })

   socket.on("chat-message",(data ,sender)=>{  // take data to the reciever from sender
        const [matchingRoom , found] = Object.entries(connections) // if found matching room and found true then combines room 1 and room 2 in the form of an array in a single connection  like this => [["room1",["A","B"]],["room2",["C","D"]]]
        .reduce(([room , isFound],[roomKey,roomValue])=>{  //  Saare rooms check karo. Jis room me current socket mile us room ka naam return kar do.
            if(!isFound && roomValue.includes(socket.id)){  //is current user is in this room ? if yes then room found
                return [roomKey,true];  
            }
            return [room , isFound];
        },['',false]);
     
        if(found ){   //if room found
            if(messages[matchingRoom] === undefined){  //is room ki chat list nahi bani to bana do.
                messages[matchingRoom]=[]   ///start from empty
            }
            messages[matchingRoom].push({'sender':sender , "data":data , "socket-id-sender":socket.id})  // push new messages in chat history to start chat
            console.log("message",matchingRoom , ":" , sender , data); //chat print 
            
            connections[matchingRoom].forEach(elem => {  //traverse every member of the room
                io.to(elem).emit("chat-message",data , sender , socket.id) //send that message to every member of the connection (meeting) a sends then it goes to b ,c,d;
            });
        }

   })

//how to disconnect if user goes offline , disconnect , leave meeting.
   socket.on("disconnect",()=>{  // shows disconnect when connection lost with user
        var diffTime = Math.abs(timeOnline[socket.id] -new Date()) // calculates current time - joining time

        var key;  //this variable stores room name (ex:- meeting123)

        for(const [k, v] of Object.entries(connections)){   //run loop in every room of a connection(here k=rooms , v= users)
            for(let a=0;a<v.length;++a){  //loop in every user of each room(a = individual user)
                if(v[a] === socket.id){   //checking is that the same user which was disconnected
                    key = k             //save the room name from where the person got disconnected(key = meeting123)

                    for(let a=0;a<connections[key].length;++a){                  //traverse all the members of that key from where the person left (meeting123)
                        io.to(connections[key][a]).emit('user-left',socket.id)   //send "user left" message to all the users of that room
                    }
                    var index = connections[key].indexOf(socket.id)      //find the index of the disconnected user in the room

                    connections[key].splice(index,1)    //delete that user from the room

                    if(connections[key].length ===0){    //if there is no user remaining in the room  then delete the entire room(k)
                        delete connections[key]
                    }
                }
            }
        }
   })

  })

  return io;
};
