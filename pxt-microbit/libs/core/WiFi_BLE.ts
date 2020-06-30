namespace WiFiSetResponses{
    let UARTs = new bBoard.UARTSettings();
    export class SetResponse{
    
    readonly defaultWiFiTimeoutmS :number ; 
    response : number;
    receivedData : String
    MQTTMessageRetrieveState : number ;
    
    MQTTMessage : String;
    
    constructor(){
    this.defaultWiFiTimeoutmS = 10000; //default time alloted for timeout on WiFi communication
    this.response = 2;
    this.receivedData = ""; //A place to store the response from the WiFi clickwhen requestting HTTP data
    this.MQTTMessageRetrieveState = 0; //Track MQTT message retrieval state.
    this.MQTTMessage = ""; //Used to store the retrieved message   
    }
    
    clearSerialBuffer() {
        //   serial.clearRxBuffer()
    }
    
    WiFiResponse(
        expectedResponse: string,
        IPDResponseTrue: boolean,
        timeoutmS: number,
        clickBoardNum: clickBoardID
    ) {
        
        let IPDLengthIndexStart = 0; 
        let receivedStr = ""; //The built string
        let tempIndex = 0; 
        this.receivedData = "";
        let IPDResponseLength = 0; //IPD Response length
    
    
        let expectedResponseIndex = 0; //The current position of the expected response comparison
    
        let responseState = 0; //Used to track where we are in parsing the response
        let startTime = input.runningTime(); //Get the time when this was called
       
        while (input.runningTime() < (startTime + timeoutmS)) {
            //Do the code below while timeout hasn't occured
          
    
    
            if(UARTs.isUARTDataAvailable(clickBoardNum))
            {
               
                receivedStr = receivedStr + UARTs.getUARTData(clickBoardNum); //Read the serial port for any received responses
              
            }
             
                    switch (responseState) {
                        case 0:
                       
                            if (receivedStr.indexOf(expectedResponse) != -1)
                            {
                               
                                responseState = 1; //Move to the next stage of response comparison
                               
                            }
                            break;
    
                        case 1:
                       
                                    if (IPDResponseTrue == true) {
                                      
                                        expectedResponseIndex = 0; //Reset the expected response index as we need to start over
    
                                        responseState = 3;
                                    } 
                                    else {
                                        
                                        this.receivedData = receivedStr
                                        return 1; //Succesfully matched
                                    }
                               
                            break;
                  
    
                        case 3:
                            tempIndex = receivedStr.indexOf("+IPD");
                           
                            if ( tempIndex != -1)
                                  {
                                  
                                      expectedResponseIndex = tempIndex;
                                      responseState = 4;
                                  }
                             
                            break;
    
                        case 4:
                            tempIndex = receivedStr.indexOf(",",expectedResponseIndex);
                           
                            if (tempIndex != -1) {
                              
                                IPDLengthIndexStart = tempIndex + 1;
                                responseState = 5;
                            }
                            break;
    
                        case 5:
                            tempIndex = receivedStr.indexOf(":",expectedResponseIndex);
                    
                            if (tempIndex != -1) {
                               
                                expectedResponseIndex = tempIndex;
                                IPDResponseLength = parseInt(receivedStr.substr(IPDLengthIndexStart,(expectedResponseIndex - IPDLengthIndexStart))); //Convert the characters we received representing the length of the IPD response to an integer
                                
                                
                             
                                responseState = 6;
                            }
                              
                            break;
    
                        case 6:
                            if(receivedStr.length >= IPDResponseLength){  //Make sure all of the message has arrived
                                this.receivedData = receivedStr.slice(expectedResponseIndex+1); //Remove everything except the message
                                return 1; //Successfully read
    
                            }
                         
                        
    
                            break;
                    } //Switch
               
            
        }
    
        return 0;
    }
    
    
    
    ThingSpeakResponse() {
        let data = 0;
        let dataStr = "";
        let responseState = 0; //Used to track where we are in parsing the response
        let currentCharIndex = 0; //Used to track the character we are currently looking at
    
        let expectedResponseStr = "\"feeds\""; //Used to hold the desired response we are looking for
        let expectedResponseLen = expectedResponseStr.length; //Length of the expected Response we are looking for
        let expectedResponseIndex = 0; //Used to track the character we are currently looking at for the expected response
    
        let receivedDataLen = this.receivedData.length; //Length of the response
    
        for (
            let currentCharIndex = 0;
            currentCharIndex < receivedDataLen;
            currentCharIndex++
        ) {
            switch (responseState) {
                case 0:
                    if (
                        this.receivedData
                            .charAt(currentCharIndex)
                            .compare(
                                expectedResponseStr.charAt(expectedResponseIndex)
                            ) == 0
                    ) {
                        expectedResponseIndex++; //Look at the next character in the expected response next time through
    
                        if (expectedResponseIndex == expectedResponseLen) {
                            expectedResponseStr = "field1\":\""; //Used to hold the desired response we are looking for
                            expectedResponseLen = expectedResponseStr.length; //Length of the expected Response we are looking for
                            expectedResponseIndex = 0; //Used to track the character we are currently looking at for the expected response
                            responseState = 1; //Move to the next stage of response comparison
                        }
                    }
                    break;
    
                case 1:
                    if (
                        this.receivedData
                            .charAt(currentCharIndex)
                            .compare(
                                expectedResponseStr.charAt(expectedResponseIndex)
                            ) == 0
                    ) {
                        expectedResponseIndex++; //Look at the next character in the expected response next time through
    
                        if (expectedResponseIndex == expectedResponseLen) {
                            expectedResponseStr = "\""; //Used to hold the desired response we are looking for
                            expectedResponseLen = expectedResponseStr.length; //Length of the expected Response we are looking for
                            expectedResponseIndex = 0; //Used to track the character we are currently looking at for the expected response
                            responseState = 2; //Move to the next stage of response comparison
                        }
                    }
                    break;
                case 2:
                    if (
                        this.receivedData
                            .charAt(currentCharIndex)
                            .compare(expectedResponseStr.charAt(0)) == 0
                    ) {
                        data = parseInt(dataStr); //Convert the characters we received representing the length of the IPD response to an integer
                        return dataStr;
                    } else {
                        dataStr = dataStr.concat(
                            this.receivedData.charAt(currentCharIndex)
                        );
                    }
                    break;
            }
        }
    
        return "";
    
        }
    
        }
    }




    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      /**
 * Custom blocks
 */
//% weight=100 color=#FF2F92 icon=""
//% advanced=true
namespace WiFi_BLE {
    let UARTs = new bBoard.UARTSettings();

    let SetResponseObj= new WiFiSetResponses.SetResponse();



    //% groups=" 'Connect' weight=100, 'IFTTT', 'Thingspeak','MQTT Adafruit', 'Brilliant Labs Cloud','Bluetooth Click Board' weight=50, 'RFID Click Board', 'NFC Click Board' 'LoRaWAN Click, '3G Click Board' "
let MQTTMessage = ""
let UARTRawData  = ""

    let flag = true;

    let BLMQTTMessage = ""
    export enum Command
    {
          
            //% block="Set Variable"
            Set_Variable = 0,
            //% block="Create Variable"
            Create_Variable = 1,
             //% block="Delete Variable"
             Delete_Variable = 2,
           //% block="Add_Data_Point"
           Add_Data_Point = 3,
           //% block="Delete Data_Point"
           Delete_Data_Point = 4,
                  //% block="Create_Data_Point"
                  Create_Data_Point = 5
    
    }

    // -------------- 3. Cloud ----------------
    //% blockId=publishBLMQTT
    //% block="BL MQTT publish command %command|variable name %varName|data %data|API key %topic|on click%clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    export function publishBLMQTT(command:Command,varName: string, data: number,topic: string, clickBoardNum: clickBoardID): void {
        let publishPacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE, 0, 0x30); //Publish Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let topicLength = pins.createBuffer(2);
        topicLength.setNumber(NumberFormat.UInt8LE, 0, topic.length >> 8);
        topicLength.setNumber(NumberFormat.UInt8LE, 1, topic.length & 0xFF);
        let cmd = ""
        switch(command)
        {
            case Command.Set_Variable:
                cmd = "SET_VARIABLE";
                break;

            case Command.Create_Variable:
                cmd = "CREATE_VARIABLE";
                break;     
            
            case Command.Delete_Variable:
                cmd = "DELETE_VARIABLE";
                break;           



        }
        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet
        let mqttBody = 
        "{\r\n" +
        "  \"key\": \""+topic+"\",\r\n" +
        "  \"cmd\": \""+cmd+"\",\r\n" +
        "  \"name\": \""+varName+"\",\r\n" +
        "  \"value\": \""+data.toString()+"\"\r\n"+
        "}" 


        X = 0x02 + topic.length + mqttBody.length

        for (i = 0; i < 4; i++) {
            if (X >= 128) {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, 0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1)
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE, j, remainingLengthTemp.getNumber(NumberFormat.UInt8LE, j))

        }

        publishPacketSize = 1 + remainingLength.length + 2 + topic.length + mqttBody.length



        UARTs.sendString("AT+CIPSEND=0," + publishPacketSize.toString() + "\r\n", clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"

        UARTs.sendBuffer(controlPacket, clickBoardNum)
        UARTs.sendBuffer(remainingLength, clickBoardNum)
        UARTs.sendBuffer(topicLength, clickBoardNum)
        UARTs.sendString(topic, clickBoardNum)
        UARTs.sendString(mqttBody, clickBoardNum)
        // UARTs.sendString("\r\n",clickBoardNum)


        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
        basic.pause(200)


        //  UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        //  SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"



    }


    // -------------- 3. Cloud ----------------
    //% blockId=connectBLMQTT
    //% block="Connect to BL MQTT broker on click%clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    export function connectBLMQTT(clickBoardNum: clickBoardID): void {

        let connectPacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE, 0, 0x10); //Publish Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let protocolName = "MQTT"

        let protocolNameLength = pins.createBuffer(2);
        protocolNameLength.setNumber(NumberFormat.UInt8LE, 0, protocolName.length >> 8);
        protocolNameLength.setNumber(NumberFormat.UInt8LE, 1, protocolName.length & 0xFF);


        let protocolLevel = pins.createBuffer(1);
        protocolLevel.setNumber(NumberFormat.UInt8LE, 0, 0x04);

        let protocolFlags = pins.createBuffer(1);
        protocolFlags.setNumber(NumberFormat.UInt8LE, 0, 0x02);


        let keepAliveSeconds = 60

        let keepAlive = pins.createBuffer(2);
        keepAlive.setNumber(NumberFormat.UInt8LE, 0, keepAliveSeconds >> 8);
        keepAlive.setNumber(NumberFormat.UInt8LE, 1, keepAliveSeconds & 0xFF);


        let clientID = control.deviceSerialNumber().toString();
        let clientIDLength = pins.createBuffer(2);
        clientIDLength.setNumber(NumberFormat.UInt8LE, 0, clientID.length >> 8);
        clientIDLength.setNumber(NumberFormat.UInt8LE, 1, clientID.length & 0xFF);

        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet


        X = protocolNameLength.length + protocolName.length + protocolLevel.length + protocolFlags.length + keepAlive.length + clientIDLength.length + clientID.length //Add up all of the bytes to determine the connect packet size
        connectPacketSize = X

        for (i = 0; i < 4; i++) { //This for loop determines if we need more than one byte to store the remaining length. With MQTT, you can use up to 4 bytes to say how long your remaining length is. 
            if (X >= 128) { //If your remaining length is greater than or equal to 128 bytes (making the 8th bit a 1), the MQTT broker automatically knows that the remaining length will expand another byte
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, 0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1) //Now that we've determined 
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE, j, remainingLengthTemp.getNumber(NumberFormat.UInt8LE, j))

        }

        connectPacketSize = controlPacket.length + remainingLength.length + connectPacketSize; //The total size of the packet to send


        SetResponseObj.clearSerialBuffer()

        UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum)

        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
        SetResponseObj.clearSerialBuffer()
        UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"cloud.brilliantlabs.ca\",1883,30\r\n", clickBoardNum)


        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
        SetResponseObj.clearSerialBuffer()
        UARTs.sendString("AT+CIPSEND=0," + connectPacketSize.toString() + "\r\n", clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"

        UARTs.sendBuffer(controlPacket, clickBoardNum)
        UARTs.sendBuffer(remainingLength, clickBoardNum)
        UARTs.sendBuffer(protocolNameLength, clickBoardNum)
        UARTs.sendString(protocolName, clickBoardNum)
        UARTs.sendBuffer(protocolLevel, clickBoardNum)
        UARTs.sendBuffer(protocolFlags, clickBoardNum)
        UARTs.sendBuffer(keepAlive, clickBoardNum)
        UARTs.sendBuffer(clientIDLength, clickBoardNum)
        UARTs.sendString(clientID, clickBoardNum)
 
        // basic.pause(1)
        //UARTs.sendString("\r\n", clickBoardNum)



        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
        basic.pause(200)



        



    }


    // -------------- 3. Cloud ----------------
    //% blockId=subscribeBLMQTT
    //% block="Subscribe to BL MQTT with API Key %topic on click%clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    export function subscribeBLMQTT(topic: string, clickBoardNum: clickBoardID): void {
        if (topic.indexOf("-rsp") == 0)
        {
            topic = topic + "-rsp"; //append -rsp to the API key as this is the proper subscription topic name
        }
        
        let subscribePacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE, 0, 0x82); //Subscribe Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let packetID = pins.createBuffer(2); // packet ID 
        packetID.setNumber(NumberFormat.UInt8LE, 0, 0);
        packetID.setNumber(NumberFormat.UInt8LE, 1, 1);

        let topicLength = pins.createBuffer(2);

        topicLength.setNumber(NumberFormat.UInt8LE, 0, topic.length >> 8);
        topicLength.setNumber(NumberFormat.UInt8LE, 1, topic.length & 0xFF);

        let QS = pins.createBuffer(1);
        QS.setNumber(NumberFormat.UInt8LE, 0, 0); //Set QOS to 0

        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet


        X = 0x02 + 2 + topic.length + 1

        for (i = 0; i < 4; i++) {
            if (X >= 128) {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, 0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE, i, X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1)
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE, j, remainingLengthTemp.getNumber(NumberFormat.UInt8LE, j))

        }

        subscribePacketSize = 1 + remainingLength.length + 2 + 2 + topic.length + 1



        UARTs.sendString("AT+CIPSEND=0," + subscribePacketSize.toString() + "\r\n", clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"

        UARTs.sendBuffer(controlPacket, clickBoardNum)
        UARTs.sendBuffer(remainingLength, clickBoardNum)
        UARTs.sendBuffer(packetID, clickBoardNum)
        UARTs.sendBuffer(topicLength, clickBoardNum)
        UARTs.sendString(topic, clickBoardNum)
        UARTs.sendBuffer(QS, clickBoardNum) //Quality of service




        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
        basic.pause(200)
        UARTs.clearUARTRxBuffer(clickBoardNum);
     

        control.inBackground(function () {
            while(1){
                basic.pause(10000);
                pingBLMQTT(50, clickBoardNum);

            }

            
        })


    }
    

   
    // -------------- 3. Cloud ----------------
    //% blockId=getBLMQTTMessage
    //% block="Get BL MQTT Message with variable name %varName on click%clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    export function getBLMQTTMessage(varName: string, clickBoardNum: clickBoardID): number {
        let returnValue = 0
        for(let i=0; i < mqttMessageList.length; i++)
        {
            if(mqttMessageList[i].varName == varName)
            {
                returnValue =  parseInt(mqttMessageList[i].value)
                mqttMessageList.removeAt(i);
                return returnValue
            }
        
        }
        return returnValue = null
       
    }

 

 
   
    let MQTTMessageObject ={
        topic:"", //Topic
   
        key:"", //API Key
 
        cmd:"", //Command Name
  
        varName:"", //Variable name
 
        value:"" //Value received 
   
        
     }

let mqttMessageList = [MQTTMessageObject]; //Create a blank array of MQTTMessageObject objects
mqttMessageList.pop(); 

    // -------------- 3. Cloud ----------------
    //% blockId=isBLMQTTMessage
    //% block="Is MQTT Message Available for variable %varName on click%clickBoardNum ?"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    export function isBLMQTTMessage(varName: string, clickBoardNum: clickBoardID): boolean {
        let startIndex = 0;
        let endIndex = 0;
        let remainingLength = 0;
        let topicLength = 0;
     

        if (UARTRawData.length > 500) {
            UARTRawData = ""
        }
       
        if (UARTs.isUARTDataAvailable(clickBoardNum) || UARTRawData.length > 0) //Is new data available OR is there still unprocessed data?
        {
          
            UARTRawData = UARTRawData + UARTs.getUARTData(clickBoardNum); // Retrieve the new data and append it

            let IPDIndex = UARTRawData.indexOf("+IPD,0,") //Look for the ESP WiFi response +IPD which indicates data was received
            if (IPDIndex != -1) //If +IPD, was found 
            {

     
                startIndex = UARTRawData.indexOf(":") //Look for beginning of MQTT message (which comes after the :)

                if (startIndex != -1) //If a : was found
                {
                    let IPDSizeStr = UARTRawData.substr(IPDIndex + 7, startIndex - IPDIndex - 7) //The length of the IPD message is between the , and the :


                    let IPDSize = parseInt(IPDSizeStr)
                    if (UARTRawData.length >= IPDSize + startIndex + 1) //Is the whole message here?
                    {

                        startIndex += 1; // Add 1 to the start index to get the first character after the ":"

                        if (UARTRawData.charCodeAt(startIndex) != 0x30) //If message type is not a publish packet
                        {
                            
                            UARTRawData = UARTRawData.substr(startIndex, startIndex); //Remove all data other than the last character (in case there is no more data)
                            return false; //Not a publish packet

                        }
                       
                        

                        remainingLength = UARTRawData.charCodeAt(startIndex + 1); //Extract the remaining length from the MQTT message (assuming RL < 127) *Need to address this for RL >127

                        topicLength = UARTRawData.charCodeAt(startIndex + 3); //Extract the topic length from the MQTT message (assuming TL < 127)
                        MQTTMessageObject.topic = UARTRawData.substr(startIndex + 4,topicLength) //Extract the topic 
                      
                        MQTTMessage = UARTRawData.substr(startIndex + 4 + topicLength, remainingLength - topicLength - 2)

                        startIndex = MQTTMessage.indexOf("\"key\":")+8; //Retrieve the start of the word "key" and then add 8 to bring it to the first character of the key
                        endIndex = MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the key by looking for the ' " ' and then subtracting 1 to get the last character of the key

                        MQTTMessageObject.key = MQTTMessage.substr(startIndex,endIndex-startIndex+1)  //Extract the key 
                     
                        startIndex = MQTTMessage.indexOf("\"cmd\":")+8; //Retrieve the start of the word "cmd" and then add 8 to bring it to the first character of the command
                        endIndex = MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the command name by looking for the ' " ' and then subtracting 1 to get the last character of the command

                        MQTTMessageObject.cmd = MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the command name 
                    
                        startIndex = MQTTMessage.indexOf("\"name\":")+9; //Retrieve the start of the word "name" and then add 9 to bring it to the first character of variable name
                        endIndex = MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the variable name by looking for the ' " ' and then subtracting 1 to get the last character of the name

                        MQTTMessageObject.varName = MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the variable name 
                    
                        startIndex = MQTTMessage.indexOf("\"value\":")+9; //Retrieve the start of the word "value" and then add 9 to bring it to the first character of variable value
                        endIndex = MQTTMessage.indexOf("}",startIndex)-2; //Retrieve the end of the variable value by looking for the ' " ' and then subtracting 2 to get the last character of the value

                        MQTTMessageObject.value = MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the variable value
                
                        if(MQTTMessageObject.cmd  == "SET_VARIABLE") //We are only concerned with the case where an existing variable had a new value added to it (for now)
                        {
                            mqttMessageList.push(MQTTMessageObject); //Add the latest message to our list
                            
                        }
                        

                        UARTRawData = UARTRawData.substr(IPDSize + startIndex, UARTRawData.length - 1) //Remove all data other than the last character (in case there is no more data)

                        

                    }


                }
            }
            else
            {
                UARTRawData = ""
            }


        }
       
        let results = mqttMessageList.filter(tempResults => tempResults.varName === varName)
        if(results.length >= 1) //If a value was found
        {
            return true; 
        }
        return false;

    }


 let BLpingActive = false; 
 let PINs = new bBoard.PinSettings();
    // -------------- 3. Cloud ----------------
    //% blockId=pingBLMQTT
    //// block="Ping BL MQTT every %pingInterval seconds on click%clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    //% pingInterval.min=1 pingInterval.max=59
    //% advanced=false
    export function pingBLMQTT(pingInterval: number, clickBoardNum: clickBoardID) {
        if (BLpingActive == false) {
            lastPing = input.runningTime();
            let controlPacket = pins.createBuffer(1);
            controlPacket.setNumber(NumberFormat.UInt8LE, 0, 0xC0); //Subscribe Control Packet header
            let remainingLength = pins.createBuffer(1) //size of remaining Length packet
            remainingLength.setNumber(NumberFormat.UInt8LE, 0, 0x00); //Remaining Length = 0 

            UARTs.sendString("AT+CIPSEND=0,2\r\n", clickBoardNum)
            SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"
            UARTs.sendBuffer(controlPacket, clickBoardNum);
            UARTs.sendBuffer(remainingLength, clickBoardNum);
            SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS, clickBoardNum); //Wait for the response "OK"

            BLpingActive = true;
        }
        else //If a ping has been sent
        {
            if ((input.runningTime() - lastPing) > pingInterval * 1000) {
                BLpingActive = false;
            }
        }




    }
    // -------------- 2. WiFi ----------------
    //% blockId=WiFi_BLE_WiFiConnect
    //% block="Connect to ssid %ssid| with password %pwd on click%clickBoardNum"
    //% weight=100
    //% group="Connect"
    //% blockGap=7
    export function WifiConnect(ssid: string, pwd: string,clickBoardNum: clickBoardID): void {
        PINs.clearPin(clickIOPin.RST,clickBoardNum)
        PINs.setPin(clickIOPin.RST,clickBoardNum)
        basic.pause(300)
        UARTs.clearUARTRxBuffer(clickBoardNum);
 


        UARTs.sendString("AT+CWMODE=1\r\n", clickBoardNum); //Put the clickinto station (client) mode
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

       SetResponseObj.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
       UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum);  //Enable multiple connections
       SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

      SetResponseObj.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
      UARTs.sendString("AT+CWJAP=\"" + ssid + "\",\"" + pwd + "\"\r\n", clickBoardNum);  //Connect to WiFi Network
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

       SetResponseObj.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
       UARTs.sendString("AT+CIPSTATUS\r\n", clickBoardNum);  //Get information about the connection status
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

       SetResponseObj.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
       UARTs.sendString("AT+CIFSR\r\n", clickBoardNum);  //Get local IP Address
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
    }


    // --------------  Dual Auth----------------
    //% blockId=WiFi_BLE_dualAuth
    //% block="PNB-Internet Captive Portal username %username and password %password on click%clickBoardNum"
    //% weight=90
    //% group="Connect"
    //% blockGap=7
    
export function dualAuth(
    username: string,
    password: string,
    clickBoardNum: clickBoardID
): void {
    let body =  "username="+username+"&password="+password+"&buttonClicked=4"
    let getData =
        "POST /login.html? HTTP/1.1\r\n" +
        "Host: auth.gnb.ca\r\n" +
        "Content-Type: application/x-www-form-urlencoded\r\n" +
        "cache-control: no-cache\r\n" +
        "redirect_url: msn.ca\r\n" +
        "Content-Length: "+body.length.toString()+"\r\n\r\n" +
        body

        UARTs.sendString("AT+CIPSTART=0,\"SSL\",\"auth.gnb.ca\",443\r\n",clickBoardNum) //Make a SSL connection to the auth.gnb.ca
    SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

    UARTs.sendString(
        "AT+CIPSEND=0," + getData.length.toString() + "\r\n",clickBoardNum); //Get ready to send a packet and specifiy the size

    SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

    UARTs.sendString(getData,clickBoardNum); //Send the contents of the packet
    SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

    UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum); //Close your TCP connection
    SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

}

    // -------------- 3. Cloud ----------------
    //% blockId=BLTest_set_thingspeak
    //% block="Send ThingSpeak key %key| fieldNum %fieldNum| data %data on click%clickBoardNum"
    //% weight=90
    //% group="Thingspeak"
    //% blockGap=7
    export function sendThingspeak(
        key: string,
        fieldNum: number,
        data: string,
        clickBoardNum: clickBoardID
    ): void {
        let getData =
            "GET /update?api_key=" +
            key +
            "&field" +
            fieldNum.toString() +
            "=" +
            data +
            "\r\n";

        UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum); 
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n", clickBoardNum); 
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        UARTs.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n", clickBoardNum);
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        UARTs.sendString(getData, clickBoardNum);
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", true, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);
        //*** Need to address this. Use CIPSTATUS to see when TCP connection is closed as thingspeak automatically closes it when message sent/received */
        // UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        //response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
    }

    // -------------- 3. Cloud ----------------
    //% blockId=WiFi_BLE_HTTPSsendCommand
    //% block="BL HTTPS command %command|variable name %varName|data %data|API key %topic|on click%clickBoardNum"
    //% weight=90
    //% group="Brilliant Labs Cloud"
    //% blockGap=7
    export function HTTPSsendCommand(
        command:Command,
        varName: string,
        data: number,
        topic: string,
        clickBoardNum: clickBoardID
    ): void {
        let cmd = ''
        switch(command)
        {
            case Command.Set_Variable:
                cmd = "SET_VARIABLE";
                break;

            case Command.Create_Variable:
                cmd = "CREATE_VARIABLE";
                break;     
            
            case Command.Delete_Variable:
                cmd = "DELETE_VARIABLE";
                break;           

                case Command.Create_Data_Point:
                cmd = "CREATE_CHART";
                break;        

                case Command.Add_Data_Point:
                cmd = "ADD_DATA_POINT";
                break;    
                
                case Command.Delete_Variable:
                cmd = "DELETE_DATA_POINT";
                break;    



        }

        let bodyString = "{\n    \"key\": \""+topic+ "\",\n   \"cmd\": \""+cmd+"\",\n    \"value\": "+data.toString()+",\n    \"name\": \""+varName+"\"\n}";
        if(command = Command.Create_Data_Point)
        {
            bodyString = "{\n    \"key\": \""+topic+ "\",\n   \"cmd\": \""+cmd+"\",\n   \"type\": \"LINE\",\n    \"value\": "+data.toString()+",\n    \"name\": \""+varName+"\"\n}";
        }
        let getData ="GET /api? HTTP/1.1\r\n" +
            "Host: cloud.brilliantlabs.ca\r\n" +
            "Content-Type: application/json\r\n" +
            "cache-control: no-cache\r\n" +
            "Content-Length: "+bodyString.length.toString()+"\r\n\r\n" + bodyString;
            
        
        if( isConnected(clickBoardNum) == 0){

            UARTs.sendString("AT+CIPSTART=0,\"SSL\",\"cloud.brilliantlabs.ca\",443\r\n", clickBoardNum); 
            SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);
        }
     

        UARTs.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n", clickBoardNum);
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        UARTs.sendString(getData, clickBoardNum);

        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);



    }

     function isConnected(clickBoardNum: clickBoardID):number{
        UARTs.sendString("AT+CIPSTATUS\r\n", clickBoardNum); 
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);
        
        let statusStartIndex = SetResponseObj.receivedData.indexOf("STATUS:")
       
        let connected = parseInt(SetResponseObj.receivedData.substr(statusStartIndex+7,1)); //Convert the characters we received representing the length of the IPD response to an integer
      
        if (connected == 3)
        {
          
           
            return 1;
        }
     
        
        return 0;
     }
       
  
    //% blockId=WiFi_BLE_getVariable
    //% block="BL HTTPS get variable %varName with API key %key on click%clickBoardNum"
    //% weight=90
    //% group="Brilliant Labs Cloud"
    //% blockGap=7
    export function BLgetVariable(
        varName: string,
        key: string,
        clickBoardNum: clickBoardID
    ): number {
        let bodyString = "{\n    \"key\": \""+key+ "\",\n   \"cmd\": \"GET_VARIABLE\",\n    \"name\": \""+varName+"\"\n}";

        let getData ="GET /api? HTTP/1.1\r\n" +
            "Host: cloud.brilliantlabs.ca\r\n" +
            "Content-Type: application/json\r\n" +
            "cache-control: no-cache\r\n" +
            "Content-Length: "+bodyString.length.toString()+"\r\n\r\n" + bodyString;

            if( isConnected(clickBoardNum) == 0){

                UARTs.sendString("AT+CIPSTART=0,\"SSL\",\"cloud.brilliantlabs.ca\",443\r\n", clickBoardNum); 
                SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);
            }

        UARTs.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n", clickBoardNum);
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        UARTs.sendString(getData, clickBoardNum);

        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", true, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum);

        let startIndex = SetResponseObj.receivedData.indexOf("\""+varName+"\":")+varName.length+3; 

        let endIndex = SetResponseObj.receivedData.indexOf("}",startIndex)-1;
      

        return parseInt(SetResponseObj.receivedData.substr(startIndex,endIndex-startIndex+1))



    }


    // -------------- 3. Cloud ----------------
    //% blockId=BLTest_get_thingspeak
    //% block="Get ThingSpeak ChannelID %ChannelID| fieldNum %fieldNum on click%clickBoardNum"
    //% weight=90
    //% group="Thingspeak"
    //% blockGap=7
    export function getThingspeak(ChannelID: number, fieldNum: number, clickBoardNum: clickBoardID): string {
        let getData =
            "GET /channels/" +
            ChannelID.toString() +
            "/fields/" +
            fieldNum.toString() +
            ".json?results=1\r\n";
        let data = "";

        UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n", clickBoardNum); 
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n", clickBoardNum
        );
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString(getData,clickBoardNum);
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", true, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        data = SetResponseObj.ThingSpeakResponse();

        //*** Need to address this. Use CIPSTATUS to see when TCP connection is closed as thingspeak automatically closes it when message sent/received */
        // UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        // SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK" //Wait for the response "OK"

        return data;
    }

    //% blockId=BL_set_ifttt
    //% block="Send IFTTT key %key|event_name %event|value1 %value1 on click%clickBoardNum"
    //% group="IFTTT"
    //% weight=90
    export function sendIFTTT(
        key: string,
        eventname: string,
        value1: number,clickBoardNum: clickBoardID
    ): void {
        let getData =
            "GET /trigger/" +
            eventname +
            "/with/key/" +
            key +
            "?value1=" +
            value1.toString() +
            " HTTP/1.1\r\nHost: maker.ifttt.com\r\n\r\n";

        UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum);  //Multiple connections enabled
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"maker.ifttt.com\",80\r\n", clickBoardNum);  //Make a TCP connection to the host
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n",clickBoardNum
        ); //Get ready to send a packet and specifiy the size
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString(getData,clickBoardNum); //Send the contents of the packet
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", true, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendString("AT+CIPCLOSE=0\r\n", clickBoardNum);  //Close your TCP connection
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
    }

    // -------------- 3. Cloud ----------------
    //% blockId=publishAdafruitMQTT
    //% block="Publish to Adafruit MQTT topic %string| data %data on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    export function publishAdafruitMQTT(topic: string, data: number,clickBoardNum: clickBoardID): void {
        let publishPacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE,0,0x30); //Publish Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let topicLength = pins.createBuffer(2);
        topicLength.setNumber(NumberFormat.UInt8LE,0,topic.length >> 8); 
        topicLength.setNumber(NumberFormat.UInt8LE,1,topic.length & 0xFF); 

        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet


        X = 0x02 + topic.length + data.toString().length 

        for (i = 0; i < 4; i++) {
            if (X >= 128) {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1)
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE,j,remainingLengthTemp.getNumber(NumberFormat.UInt8LE,j))

        }

        publishPacketSize = 1 + remainingLength.length + 2 + topic.length + data.toString().length


  
        UARTs.sendString("AT+CIPSEND=0," + publishPacketSize.toString() + "\r\n",clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendBuffer(controlPacket,clickBoardNum)
        UARTs.sendBuffer(remainingLength,clickBoardNum)
        UARTs.sendBuffer(topicLength,clickBoardNum)
        UARTs.sendString(topic,clickBoardNum)
        UARTs.sendString(data.toString(),clickBoardNum)
       // UARTs.sendString("\r\n",clickBoardNum)


        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        basic.pause(200)


      //  UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
      //  SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"



    }


    // -------------- 3. Cloud ----------------
    //% blockId=connectMQTT
    //% block="Connect to Adafruit MQTT broker with username %userName| and AIO Key %password on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    export function connectMQTT(userName: string, password: string,clickBoardNum: clickBoardID): void {

        let connectPacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE,0,0x10); //Publish Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let protocolName = "MQTT"

        let protocolNameLength = pins.createBuffer(2);
        protocolNameLength.setNumber(NumberFormat.UInt8LE,0,protocolName.length >> 8); 
        protocolNameLength.setNumber(NumberFormat.UInt8LE,1,protocolName.length & 0xFF); 


        let protocolLevel = pins.createBuffer(1);
        protocolLevel.setNumber(NumberFormat.UInt8LE,0,0x04); 
      
        let protocolFlags = pins.createBuffer(1);
        protocolFlags.setNumber(NumberFormat.UInt8LE,0,0xC2); 
      
     
        let keepAliveSeconds = 60

        let keepAlive = pins.createBuffer(2);
        keepAlive.setNumber(NumberFormat.UInt8LE,0,keepAliveSeconds >> 8); 
        keepAlive.setNumber(NumberFormat.UInt8LE,1,keepAliveSeconds & 0xFF); 

     
        let clientID = control.deviceSerialNumber().toString();
        let clientIDLength = pins.createBuffer(2);
        clientIDLength.setNumber(NumberFormat.UInt8LE,0,clientID.length >> 8); 
        clientIDLength.setNumber(NumberFormat.UInt8LE,1,clientID.length & 0xFF); 
        
            
        let userNameLength = pins.createBuffer(2);
        userNameLength.setNumber(NumberFormat.UInt8LE,0,userName.length >> 8); 
        userNameLength.setNumber(NumberFormat.UInt8LE,1,userName.length & 0xFF); 

        let passwordLength = pins.createBuffer(2);
        passwordLength.setNumber(NumberFormat.UInt8LE,0,password.length >> 8); 
        passwordLength.setNumber(NumberFormat.UInt8LE,1,password.length & 0xFF); 

    

        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet


        X = 0x02 + 0x02 + protocolName.length + 0x01 + 0x01 + 0x02 + 0x02 + clientID.length + 0x02 + userName.length + 0x02 + password.length 
        connectPacketSize = X

        for (i = 0; i < 4; i++) {
            if (X >= 128) {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1)
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE,j,remainingLengthTemp.getNumber(NumberFormat.UInt8LE,j))

        }

        connectPacketSize = connectPacketSize + 1 + remainingLength.length //The total size of the packet to send


        SetResponseObj.clearSerialBuffer()

        UARTs.sendString("AT+CIPMUX=1\r\n",clickBoardNum)

        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        SetResponseObj.clearSerialBuffer()
        UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"io.adafruit.com\",1883,30\r\n",clickBoardNum)


        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        SetResponseObj.clearSerialBuffer()
        UARTs.sendString("AT+CIPSEND=0," + connectPacketSize.toString() + "\r\n",clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
       
        UARTs.sendBuffer(controlPacket,clickBoardNum)
        UARTs.sendBuffer(remainingLength,clickBoardNum)
        UARTs.sendBuffer(protocolNameLength,clickBoardNum)
        UARTs.sendString(protocolName,clickBoardNum)
        UARTs.sendBuffer(protocolLevel,clickBoardNum)
        UARTs.sendBuffer(protocolFlags,clickBoardNum)
        UARTs.sendBuffer(keepAlive,clickBoardNum)
        UARTs.sendBuffer(clientIDLength,clickBoardNum)
        UARTs.sendString(clientID,clickBoardNum)
        UARTs.sendBuffer(userNameLength,clickBoardNum)
        UARTs.sendString(userName,clickBoardNum)
        UARTs.sendBuffer(passwordLength,clickBoardNum)
        
        UARTs.sendString(password,clickBoardNum)
       // basic.pause(1)
        UARTs.sendString("\r\n",clickBoardNum)



        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        basic.pause(200)



    }


    // -------------- 3. Cloud ----------------
    //% blockId=subscribeAdafruitMQTT
    //% block="Subscribe to Adafruit MQTT topic %string on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    export function subscribeAdafruitMQTT(topic: string,clickBoardNum: clickBoardID): void {

        let subscribePacketSize = 0
        let controlPacket = pins.createBuffer(1);
        controlPacket.setNumber(NumberFormat.UInt8LE,0,0x82); //Subscribe Control Packet header

        let remainingLengthTemp = pins.createBuffer(4) //Max size of remaining Length packet
        let packetID = pins.createBuffer(2); // packet ID 
        packetID.setNumber(NumberFormat.UInt8LE,0,0);
        packetID.setNumber(NumberFormat.UInt8LE,1,1);

        let topicLength = pins.createBuffer(2);

        topicLength.setNumber(NumberFormat.UInt8LE,0,topic.length >> 8); 
        topicLength.setNumber(NumberFormat.UInt8LE,1,topic.length & 0xFF); 

        let QS = pins.createBuffer(1);
        QS.setNumber(NumberFormat.UInt8LE,0,0); //Set QOS to 0

        let i = 0
        let encodedByte = 0
        let X = 0
        let remainingLengthBytes = 1 //At least 1 byte of RL is necessary for packet


        X = 0x02 + 2 + topic.length + 1

        for (i = 0; i < 4; i++) {
            if (X >= 128) {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,0xFF)
                X -= 127
            }
            else {
                remainingLengthTemp.setNumber(NumberFormat.UInt8LE,i,X)
                break;

            }

        }


        let remainingLength = pins.createBuffer(i + 1)
        for (let j = 0; j < i + 1; j++) {
            remainingLength.setNumber(NumberFormat.UInt8LE,j,remainingLengthTemp.getNumber(NumberFormat.UInt8LE,j))

        }

        subscribePacketSize = 1 + remainingLength.length + 2 + 2 + topic.length +1


  
        UARTs.sendString("AT+CIPSEND=0," + subscribePacketSize.toString() + "\r\n",clickBoardNum)
        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        UARTs.sendBuffer(controlPacket,clickBoardNum)
        UARTs.sendBuffer(remainingLength,clickBoardNum)
        UARTs.sendBuffer(packetID,clickBoardNum)
        UARTs.sendBuffer(topicLength,clickBoardNum)
        UARTs.sendString(topic,clickBoardNum)
        UARTs.sendBuffer(QS,clickBoardNum) //Quality of service

     


        SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        basic.pause(200)
        UARTs.clearUARTRxBuffer(clickBoardNum);

        control.inBackground(function () {
            while(1){
                basic.pause(10000);
                
                pingAdafruitMQTT(50, clickBoardNum);

            }

            
        })
        
    }
    let prevTime = 0;
    // -------------- 3. Cloud ----------------
    //% blockId=getMQTTMessage
    //% block="Get MQTT Message on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    export function getMQTTMessage(clickBoardNum: clickBoardID): string {
        return MQTTMessage
    }
  
       //% blockId=createVariable
        //% block="Create Variable -> Api Key:%Key Name %Name on click%clickBoardNum"
        export function CreateVariable(Key: string, Name: string, clickBoardNum: clickBoardID): void {
            // Add code here
            let getData ="\{\r\n\"key\": \"9qvfccbdk0jrgfeh\",\r\n\"cmd\": \"CREATE_VARIABLE\",\r\n\"name\": \"msdsdfsfd\",\r\n\"value\": \"Hello my name is Josiah\"\r\n}\";"
    
                UARTs.sendString("AT+CIPMUX=1\r\n", clickBoardNum); 
                SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        
                UARTs.sendString("AT+CIPSTART=0,\"TCP\",\"https://cloud.brilliantlabs.ca\",80\r\n", clickBoardNum); 
                SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        
                UARTs.sendString(
                    "AT+CIPSEND=0," + getData.length.toString() + "\r\n", clickBoardNum);
                    SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
        
                UARTs.sendString(getData, clickBoardNum);
                SetResponseObj.response = SetResponseObj.WiFiResponse("OK", true, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

        }


   // -------------- 3. Cloud ----------------
    //% blockId=isMQTTMessage
    //% block="Is MQTT Message Available on click%clickBoardNum ?"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    export function isMQTTMessage(clickBoardNum: clickBoardID): boolean{
        let startIndex = 0;
        let remainingLength = 0;
        let topicLength = 0;
       if(UARTRawData.length > 300){
           UARTRawData = ""
       }
      if(UARTs.isUARTDataAvailable(clickBoardNum) || UARTRawData.length > 0) //Is new data available OR is there still unprocessed data?
      {
    
            UARTRawData = UARTRawData + UARTs.getUARTData(clickBoardNum); // Retrieve the new data and append it
   
            let IPDIndex = UARTRawData.indexOf("+IPD,0,") //Look for the ESP WiFi response +IPD which indicates data was received
            if(IPDIndex !== -1) //If +IPD, was found 
            {
            
                
                startIndex = UARTRawData.indexOf(":") //Look for beginning of MQTT message (which comes after the :)
               
                if(startIndex != -1) //If a : was found
                {
                    let IPDSizeStr = UARTRawData.substr(IPDIndex+7,startIndex-IPDIndex-7) //The length of the IPD message is between the , and the :
                   
                    
                    let IPDSize = parseInt(IPDSizeStr)
                    if(UARTRawData.length >= IPDSize + startIndex + 1) //Is the whole message here?
                    {

                        startIndex += 1; // Add 1 to the start index to get the first character after the ":"

                        if(UARTRawData.charCodeAt(startIndex) != 0x30) //If message type is not a publish packet
                        {

                            return false; //Not a publish packet

                        }
                        
                        remainingLength = UARTRawData.charCodeAt(startIndex + 1); //Extract the remaining length from the MQTT message (assuming RL < 127)
        
                        topicLength = UARTRawData.charCodeAt(startIndex + 3); //Extract the topic length from the MQTT message (assuming TL < 127)
                    
                        MQTTMessage  = UARTRawData.substr(startIndex + 4+topicLength,remainingLength-topicLength-2)
                    
                        UARTRawData = UARTRawData.substr(IPDSize + startIndex,UARTRawData.length-1) //Remove all data other than the last character (in case there is no more data)
                 
                        return true; //Message retrieved
                      
                    }
              
                    
                }
            }
     

        }
            return false;
            
    }

let pingActive = false;
let lastPing = 0;
let pingActiveAdafruit = false;
let lastPingAdafruit = 0;
    // -------------- 3. Cloud ----------------
    //% blockId=pingAdafruitMQTT
    // block="Ping Adafruit MQTT every %pingInterval seconds on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    //% pingInterval.min=1 pingInterval.max=59
    //% advanced=false
    export function pingAdafruitMQTT(pingInterval: number, clickBoardNum: clickBoardID) 
    {
        if(pingActiveAdafruit == false)
        {
            lastPingAdafruit = input.runningTime();
            let controlPacket = pins.createBuffer(1);
            controlPacket.setNumber(NumberFormat.UInt8LE,0,0xC0); //Subscribe Control Packet header
            let remainingLength = pins.createBuffer(1) //size of remaining Length packet
            remainingLength.setNumber(NumberFormat.UInt8LE,0,0x00); //Remaining Length = 0 
    
            UARTs.sendString("AT+CIPSEND=0,2\r\n",clickBoardNum)
            SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
            UARTs.sendBuffer(controlPacket,clickBoardNum);
            UARTs.sendBuffer(remainingLength,clickBoardNum);
            SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"

            pingActiveAdafruit = true;
        }
        else //If a ping has been sent
        {
            if ((input.runningTime() - lastPingAdafruit) > pingInterval*1000) 
            {
                pingActiveAdafruit = false;
            }
        }
        
    
            
        
    }
}
