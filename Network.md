### Networking:
![NetworkChuck Playlist](https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P)
- It is a interconnection between computers.

- A computer can connect with one another with ethernet.

- A switch can be used to connect multiple computers 

- A router can be used to connect multiple 
switch as well as talk to other router

- To make it wireless, we use wireless access points.

**Switch:**
- Switch only send the message to the recipient not to everyone on the switch. 
- Switch is a layer 2 device (datalink layer).
- So it knows only the layer 2 that is the mac address of every system on the switch.
- `show mac-address-table` is the cmd on switch which is used to show all the mac address along with their port used in switch.

**Hub:**
- Hub will send a message to everyone in the network
- If a sends to b using ip, the hub receives and sends to everyone on the hub.
- If b replies to a, then the hub will send the reply to everyone on the network.

**Router:**
- It is a layer 3 devices and it can handle ip address.
- Router is used to connect to switches.
- Each switch will have its own gateway.
- Suppose, if we connect two switch using a ethernet cable directly, then each switch will have its own gateaway.
- Hence, when we ping a ip address (11.*.*.*) in a different switch, our switch sees that the ip is not in its gateaway. so it ignores it. so we need router to connect two different switches.

**DNS:**
- DNS is DOMAIN NAME SYSTEM.
- It is for resolving domain to ip addresses.

**TCP/IP and OSI**
- TCP and OSI is two different network model

- TCP Layers:
    - Application layer
    - Transport layer
    - Network layer
    - Datalink layer
    - Physical layer

- OSI Layers:
    - Application layer
    - Presentation layer
    - Session layer
    - Transport layer
    - Network layer
    - Datalink layer
    - Physical layer

- HTTPS Port - 443
- HTTP port - 80

**IP Address:**
- wrote on note 

**Topics available:**
- What is IP address?
- Why most of the IP start with 192.168.1.*;
- cmd to see IP
- Reserved IP
- Classes of IP
- classful and classless state
- Private IP and public Ip with RFC 1918
- NAT
- IPV4 vs IPV6
- Subnet mask
- Subnet masking based on the no of network
- Subnet masking based on the no of hosts
