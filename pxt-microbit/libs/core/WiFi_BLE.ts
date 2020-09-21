namespace WiFiSetResponses{




    export class SetResponse extends bBoard.UARTSettings{
    
    readonly defaultWiFiTimeoutmS :number ; 
    response : number;
    receivedData : String
    MQTTMessageRetrieveState : number ;

    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number
    private clickBoardNumGlobalSetResponse:number

    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
    super(clickBoardNum, clickSlot)
    this.defaultWiFiTimeoutmS = 10000; //default time alloted for timeout on WiFi communication
    this.response = 2;
    this.receivedData = ""; //A place to store the response from the WiFi clickwhen requestting HTTP data
    this.MQTTMessageRetrieveState = 0; //Track MQTT message retrieval state.

    this.clickBoardNumGlobal=clickBoardNum;
    this.clickSlotNumGlobal=clickSlot;
    this.clickBoardNumGlobalSetResponse=clickBoardNum*3+clickSlot;   
    }
    
    clearSerialBuffer() {
        //   serial.clearRxBuffer()
    }
    
    WiFiResponse(
        expectedResponse: string,
        IPDResponseTrue: boolean,
        timeoutmS: number
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
          
    
    
            if(this.isUARTDataAvailable())
            {
               
                receivedStr = receivedStr + this.getUARTData(); //Read the serial port for any received responses
              
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

    /**
     * Sets WiFi_BLE object.
     * @param clickBoardNum the click
     * @param clickSlot the bus
     *  @param WiFi_BLE the WiFi_BLE Object
     */
    //% block="$clickBoardNum $clickSlot"
    //% blockSetVariable="WiFi_BLE"
    //% weight=110
    export function createWiFiBLE(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): WiFi_BLE {
        return new this.WiFi_BLE(clickBoardNum, clickSlot);
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

    //% groups=" 'Connect' weight=100, 'IFTTT', 'Thingspeak','MQTT Adafruit', 'Brilliant Labs Cloud','Bluetooth Click Board' weight=50, 'RFID Click Board', 'NFC Click Board' 'LoRaWAN Click, '3G Click Board' "

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


    export class WiFi_BLE extends WiFiSetResponses.SetResponse{
        MQTTMessage : string
        private UARTRawData  :  string
        private flag : boolean;
        private BLMQTTMessage : string
        private clickBoardNumGlobalWiFi:number
        private clickSlotNumGlobalWiFi:number
        private clickBoardNumGlobalW:number
        private BLpingActive : boolean;
        private prevTime :number;

        private pingActive : boolean;
        private lastPing : number;
        private pingActiveAdafruit : boolean;
        private lastPingAdafruit : number; 

        //% groups=" 'Connect' weight=100, 'IFTTT', 'Thingspeak','MQTT Adafruit', 'Brilliant Labs Cloud','Bluetooth Click Board' weight=50, 'RFID Click Board', 'NFC Click Board' 'LoRaWAN Click, '3G Click Board' "

        constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            super(clickBoardNum, clickSlot)
            this.MQTTMessage = ""
            this.UARTRawData  = ""
            this.flag = true;
            this.BLMQTTMessage = ""
            this.clickBoardNumGlobalWiFi=clickBoardNum;
            this.clickSlotNumGlobalWiFi=clickSlot;
            this.clickBoardNumGlobalW=clickBoardNum*3+clickSlot; 
            this.BLpingActive = false;
            this.prevTime = 0;
            this.pingActive = false;
            this.lastPing = 0;
            this.pingActiveAdafruit = false;
            this.lastPingAdafruit = 0; 
      
        }

    // -------------- 3. Cloud ----------------
    //% blockId=publishBLMQTT
    //% block="$this BL MQTT publish command $command|variable name $varName|data $data|API key $topic|on click$clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"  
    publishBLMQTT(command:Command,varName: string, data: number,topic: string): void {
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



        this.sendString("AT+CIPSEND=0," + publishPacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(topicLength)
        this.sendString(topic)
        this.sendString(mqttBody)
        // UARTs.sendString("\r\n",clickBoardNum)


        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)


        //  UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        //  SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"



    }


    // -------------- 3. Cloud ----------------
    //% blockId=connectBLMQTT
    //% block="$this| Connect to BL MQTT broker on click$clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"  
    connectBLMQTT(): void {

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


        this.clearSerialBuffer()

        this.sendString("AT+CIPMUX=1\r\n")

        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        this.clearSerialBuffer()
        this.sendString("AT+CIPSTART=0,\"TCP\",\"cloud.brilliantlabs.ca\",1883,30\r\n")


        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        this.clearSerialBuffer()
        this.sendString("AT+CIPSEND=0," + connectPacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(protocolNameLength)
        this.sendString(protocolName)
        this.sendBuffer(protocolLevel)
        this.sendBuffer(protocolFlags)
        this.sendBuffer(keepAlive)
        this.sendBuffer(clientIDLength)
        this.sendString(clientID)
 
        // basic.pause(1)
        //UARTs.sendString("\r\n", clickBoardNum)



        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)



        



    }


    // -------------- 3. Cloud ----------------
    //% blockId=subscribeBLMQTT
    //% block="$this| Subscribe to BL MQTT with API Key $topic on click$clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"   
    subscribeBLMQTT(topic: string): void {
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



        this.sendString("AT+CIPSEND=0," + subscribePacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(packetID)
        this.sendBuffer(topicLength)
        this.sendString(topic)
        this.sendBuffer(QS) //Quality of service




        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)
        this.clearUARTRxBuffer();
     

        control.inBackground(function () {
            while(1){
                basic.pause(10000);
                this.pingBLMQTT(50);

            }

            
        })


    }
    

   
    // -------------- 3. Cloud ----------------
    //% blockId=getBLMQTTMessage
    //% block="$this| Get BL MQTT Message with variable name $varName on click$clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    getBLMQTTMessage(varName: string): number {
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

 

 
   


    // -------------- 3. Cloud ----------------
    //% blockId=isBLMQTTMessage
    //% block="$this| Is MQTT Message Available for variable $varName on click$clickBoardNum ?"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"   
    isBLMQTTMessage(varName: string): boolean {
        let startIndex = 0;
        let endIndex = 0;
        let remainingLength = 0;
        let topicLength = 0;
     

        if (this.UARTRawData.length > 500) {
            this.UARTRawData = ""
        }
       
        if (this.isUARTDataAvailable() || this.UARTRawData.length > 0) //Is new data available OR is there still unprocessed data?
        {
          
            this.UARTRawData = this.UARTRawData + this.getUARTData(); // Retrieve the new data and append it

            let IPDIndex = this.UARTRawData.indexOf("+IPD,0,") //Look for the ESP WiFi response +IPD which indicates data was received
            if (IPDIndex != -1) //If +IPD, was found 
            {

     
                startIndex = this.UARTRawData.indexOf(":") //Look for beginning of MQTT message (which comes after the :)

                if (startIndex != -1) //If a : was found
                {
                    let IPDSizeStr = this.UARTRawData.substr(IPDIndex + 7, startIndex - IPDIndex - 7) //The length of the IPD message is between the , and the :


                    let IPDSize = parseInt(IPDSizeStr)
                    if (this.UARTRawData.length >= IPDSize + startIndex + 1) //Is the whole message here?
                    {

                        startIndex += 1; // Add 1 to the start index to get the first character after the ":"

                        if (this.UARTRawData.charCodeAt(startIndex) != 0x30) //If message type is not a publish packet
                        {
                            
                            this.UARTRawData = this.UARTRawData.substr(startIndex, startIndex); //Remove all data other than the last character (in case there is no more data)
                            return false; //Not a publish packet

                        }
                       
                        

                        remainingLength = this.UARTRawData.charCodeAt(startIndex + 1); //Extract the remaining length from the MQTT message (assuming RL < 127) *Need to address this for RL >127

                        topicLength = this.UARTRawData.charCodeAt(startIndex + 3); //Extract the topic length from the MQTT message (assuming TL < 127)
                        MQTTMessageObject.topic = this.UARTRawData.substr(startIndex + 4,topicLength) //Extract the topic 
                      
                        this.MQTTMessage = this.UARTRawData.substr(startIndex + 4 + topicLength, remainingLength - topicLength - 2)

                        startIndex = this.MQTTMessage.indexOf("\"key\":")+8; //Retrieve the start of the word "key" and then add 8 to bring it to the first character of the key
                        endIndex = this.MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the key by looking for the ' " ' and then subtracting 1 to get the last character of the key

                        MQTTMessageObject.key = this.MQTTMessage.substr(startIndex,endIndex-startIndex+1)  //Extract the key 
                     
                        startIndex = this.MQTTMessage.indexOf("\"cmd\":")+8; //Retrieve the start of the word "cmd" and then add 8 to bring it to the first character of the command
                        endIndex = this.MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the command name by looking for the ' " ' and then subtracting 1 to get the last character of the command

                        MQTTMessageObject.cmd = this.MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the command name 
                    
                        startIndex = this.MQTTMessage.indexOf("\"name\":")+9; //Retrieve the start of the word "name" and then add 9 to bring it to the first character of variable name
                        endIndex = this.MQTTMessage.indexOf("\"",startIndex)-1; //Retrieve the end of the variable name by looking for the ' " ' and then subtracting 1 to get the last character of the name

                        MQTTMessageObject.varName = this.MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the variable name 
                    
                        startIndex = this.MQTTMessage.indexOf("\"value\":")+9; //Retrieve the start of the word "value" and then add 9 to bring it to the first character of variable value
                        endIndex = this.MQTTMessage.indexOf("}",startIndex)-2; //Retrieve the end of the variable value by looking for the ' " ' and then subtracting 2 to get the last character of the value

                        MQTTMessageObject.value = this.MQTTMessage.substr(startIndex,endIndex-startIndex+1) //Extract the variable value
                
                        if(MQTTMessageObject.cmd  == "SET_VARIABLE") //We are only concerned with the case where an existing variable had a new value added to it (for now)
                        {
                            mqttMessageList.push(MQTTMessageObject); //Add the latest message to our list
                            
                        }
                        

                        this.UARTRawData = this.UARTRawData.substr(IPDSize + startIndex, this.UARTRawData.length - 1) //Remove all data other than the last character (in case there is no more data)

                        

                    }


                }
            }
            else
            {
                this.UARTRawData = ""
            }


        }
       
        let results = mqttMessageList.filter(tempResults => tempResults.varName === varName)
        if(results.length >= 1) //If a value was found
        {
            return true; 
        }
        return false;

    }



    // -------------- 3. Cloud ----------------
    //% blockId=pingBLMQTT
    //// block="$this| Ping BL MQTT every $pingInterval seconds on click$clickBoardNum"
    //% group="Brilliant Labs Cloud"
    //% weight=70   
    //% blockGap=7  
    //% pingInterval.min=1 pingInterval.max=59
    //% advanced=false
    //% this.defl="WiFi_BLE" 
    pingBLMQTT(pingInterval: number) {
        let PINs = new bBoard.PinSettings(this.clickBoardNumGlobalWiFi, this.clickSlotNumGlobalWiFi);
        if (this.BLpingActive == false) {
            this.lastPing = input.runningTime();
            let controlPacket = pins.createBuffer(1);
            controlPacket.setNumber(NumberFormat.UInt8LE, 0, 0xC0); //Subscribe Control Packet header
            let remainingLength = pins.createBuffer(1) //size of remaining Length packet
            remainingLength.setNumber(NumberFormat.UInt8LE, 0, 0x00); //Remaining Length = 0 

            this.sendString("AT+CIPSEND=0,2\r\n")
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
            this.sendBuffer(controlPacket);
            this.sendBuffer(remainingLength);
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

            this.BLpingActive = true;
        }
        else //If a ping has been sent
        {
            if ((input.runningTime() - this.lastPing) > pingInterval * 1000) {
                this.BLpingActive = false;
            }
        }




    }
    // -------------- 2. WiFi ----------------
    //% blockId=WiFi_BLE_WiFiConnect
    //% block="$this| Connect to ssid %ssid| with password %pwd on click%clickBoardNum"
    //% weight=100
    //% group="Connect"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    WifiConnect(ssid: string, pwd: string): void {
        let PINs = new bBoard.PinSettings(this.clickBoardNumGlobalWiFi, this.clickSlotNumGlobalWiFi);
        PINs.clearPin(clickIOPin.RST)
        PINs.setPin(clickIOPin.RST)
        basic.pause(300)
        this.clearUARTRxBuffer();
 


        this.sendString("AT+CWMODE=1\r\n"); //Put the clickinto station (client) mode
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
        this.sendString("AT+CIPMUX=1\r\n");  //Enable multiple connections
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
        this.sendString("AT+CWJAP=\"" + ssid + "\",\"" + pwd + "\"\r\n");  //Connect to WiFi Network
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
        this.sendString("AT+CIPSTATUS\r\n");  //Get information about the connection status
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.clearSerialBuffer(); //Clear any characters from the RX Buffer that came after the previous Response
        this.sendString("AT+CIFSR\r\n");  //Get local IP Address
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
    }


    // --------------  Dual Auth----------------
    //% blockId=WiFi_BLE_dualAuth
    //% block="$this PNB-Internet Captive Portal username $username and password $password on click$clickBoardNum"
    //% weight=90
    //% group="Connect"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    
    dualAuth(
    username: string,
    password: string
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

        this.sendString("AT+CIPSTART=0,\"SSL\",\"auth.gnb.ca\",443\r\n") //Make a SSL connection to the auth.gnb.ca
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

        this.sendString(
        "AT+CIPSEND=0," + getData.length.toString() + "\r\n"); //Get ready to send a packet and specifiy the size

        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

        this.sendString(getData); //Send the contents of the packet
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

        this.sendString("AT+CIPCLOSE=0\r\n"); //Close your TCP connection
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

}

    // -------------- 3. Cloud ----------------
    //% blockId=BLTest_set_thingspeak
    //% block="$this| Send ThingSpeak key %key| fieldNum %fieldNum| data %data on click%clickBoardNum"
    //% weight=90
    //% group="Thingspeak"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    sendThingspeak(
        key: string,
        fieldNum: number,
        data: string
    ): void {
        let getData =
            "GET /update?api_key=" +
            key +
            "&field" +
            fieldNum.toString() +
            "=" +
            data +
            "\r\n";

            this.sendString("AT+CIPMUX=1\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

            this.sendString("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

            this.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n");
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

            this.sendString(getData);
            this.response = this.WiFiResponse("OK", true, this.defaultWiFiTimeoutmS);
        //*** Need to address this. Use CIPSTATUS to see when TCP connection is closed as thingspeak automatically closes it when message sent/received */
        // UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        //response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"
    }

    // -------------- 3. Cloud ----------------
    //% blockId=WiFi_BLE_HTTPSsendCommand
    //% block="$this| BL HTTPS command %command|variable name %varName|data %data|API key %topic|on click%clickBoardNum"
    //% weight=90
    //% group="Brilliant Labs Cloud"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    HTTPSsendCommand(
        command:Command,
        varName: string,
        data: number,
        topic: string
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
            
        
        if( this.isConnected() == 0){

            this.sendString("AT+CIPSTART=0,\"SSL\",\"cloud.brilliantlabs.ca\",443\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);
        }
     

        this.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n");
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

            this.sendString(getData);

            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);



    }

        isConnected():number{
            this.sendString("AT+CIPSTATUS\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);
        
        let statusStartIndex = this.receivedData.indexOf("STATUS:")
       
        let connected = parseInt(this.receivedData.substr(statusStartIndex+7,1)); //Convert the characters we received representing the length of the IPD response to an integer
      
        if (connected == 3)
        {
          
           
            return 1;
        }
     
        
        return 0;
     }
       
  
    //% blockId=WiFi_BLE_getVariable
    //% block="$this| BL HTTPS get variable $varName with API key $key on click$clickBoardNum"
    //% weight=90
    //% group="Brilliant Labs Cloud"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    BLgetVariable(
        varName: string,
        key: string
    ): number {
        let bodyString = "{\n    \"key\": \""+key+ "\",\n   \"cmd\": \"GET_VARIABLE\",\n    \"name\": \""+varName+"\"\n}";

        let getData ="GET /api? HTTP/1.1\r\n" +
            "Host: cloud.brilliantlabs.ca\r\n" +
            "Content-Type: application/json\r\n" +
            "cache-control: no-cache\r\n" +
            "Content-Length: "+bodyString.length.toString()+"\r\n\r\n" + bodyString;

            if( this.isConnected() == 0){

                this.sendString("AT+CIPSTART=0,\"SSL\",\"cloud.brilliantlabs.ca\",443\r\n"); 
                this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);
            }

            this.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n");
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS);

            this.sendString(getData);

            this.response = this.WiFiResponse("OK", true, this.defaultWiFiTimeoutmS);

        let startIndex = this.receivedData.indexOf("\""+varName+"\":")+varName.length+3; 

        let endIndex = this.receivedData.indexOf("}",startIndex)-1;
      

        return parseInt(this.receivedData.substr(startIndex,endIndex-startIndex+1))



    }


    // -------------- 3. Cloud ----------------
    //% blockId=BLTest_get_thingspeak
    //% block="$this| Get ThingSpeak ChannelID %ChannelID| fieldNum %fieldNum on click%clickBoardNum"
    //% weight=90
    //% group="Thingspeak"
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    getThingspeak(ChannelID: number, fieldNum: number): string {
        let getData =
            "GET /channels/" +
            ChannelID.toString() +
            "/fields/" +
            fieldNum.toString() +
            ".json?results=1\r\n";
        let data = "";

        this.sendString("AT+CIPMUX=1\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendString("AT+CIPSTART=0,\"TCP\",\"api.thingspeak.com\",80\r\n"); 
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n"
        );
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendString(getData);
        this.response = this.WiFiResponse("OK", true, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        data = this.ThingSpeakResponse();

        //*** Need to address this. Use CIPSTATUS to see when TCP connection is closed as thingspeak automatically closes it when message sent/received */
        // UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
        // SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK" //Wait for the response "OK"

        return data;
    }

    //% blockId=BL_set_ifttt
    //% block="$this| Send IFTTT key %key|event_name %event|value1 %value1 on click%clickBoardNum"
    //% group="IFTTT"
    //% weight=90
    //% this.defl="WiFi_BLE" 
    sendIFTTT(
        key: string,
        eventname: string,
        value1: number
    ): void {
        let getData =
            "GET /trigger/" +
            eventname +
            "/with/key/" +
            key +
            "?value1=" +
            value1.toString() +
            " HTTP/1.1\r\nHost: maker.ifttt.com\r\n\r\n";

            this.sendString("AT+CIPMUX=1\r\n");  //Multiple connections enabled
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

            this.sendString("AT+CIPSTART=0,\"TCP\",\"maker.ifttt.com\",80\r\n");  //Make a TCP connection to the host
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

            this.sendString(
            "AT+CIPSEND=0," + getData.length.toString() + "\r\n"
        ); //Get ready to send a packet and specifiy the size
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendString(getData); //Send the contents of the packet
        this.response = this.WiFiResponse("OK", true, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendString("AT+CIPCLOSE=0\r\n");  //Close your TCP connection
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
    }

    // -------------- 3. Cloud ----------------
    //% blockId=publishAdafruitMQTT
    //% block="$this| Publish to Adafruit MQTT topic %string| data %data on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"   
    publishAdafruitMQTT(topic: string, data: number): void {
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


  
        this.sendString("AT+CIPSEND=0," + publishPacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(topicLength)
        this.sendString(topic)
        this.sendString(data.toString())
       // UARTs.sendString("\r\n",clickBoardNum)


       this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)


      //  UARTs.sendString("AT+CIPCLOSE=0\r\n",clickBoardNum)
      //  SetResponseObj.response = SetResponseObj.WiFiResponse("OK", false, SetResponseObj.defaultWiFiTimeoutmS,clickBoardNum); //Wait for the response "OK"



    }


    // -------------- 3. Cloud ----------------
    //% blockId=connectMQTT
    //% block="$this| Connect to Adafruit MQTT broker with username %userName| and AIO Key %password on click%clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"  
    connectMQTT(userName: string, password: string): void {

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


        this.clearSerialBuffer()

        this.sendString("AT+CIPMUX=1\r\n")

        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        this.clearSerialBuffer()
        this.sendString("AT+CIPSTART=0,\"TCP\",\"io.adafruit.com\",1883,30\r\n")


        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        this.clearSerialBuffer()
        this.sendString("AT+CIPSEND=0," + connectPacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
       
        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(protocolNameLength)
        this.sendString(protocolName)
        this.sendBuffer(protocolLevel)
        this.sendBuffer(protocolFlags)
        this.sendBuffer(keepAlive)
        this.sendBuffer(clientIDLength)
        this.sendString(clientID)
        this.sendBuffer(userNameLength)
        this.sendString(userName)
        this.sendBuffer(passwordLength)
        
        this.sendString(password)
        
        this.sendString("\r\n")



        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)



    }


    // -------------- 3. Cloud ----------------
    //% blockId=subscribeAdafruitMQTT
    //% block="$this| Subscribe to Adafruit MQTT topic $string on click$clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"  
    subscribeAdafruitMQTT(topic: string): void {

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


  
        this.sendString("AT+CIPSEND=0," + subscribePacketSize.toString() + "\r\n")
        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        this.sendBuffer(controlPacket)
        this.sendBuffer(remainingLength)
        this.sendBuffer(packetID)
        this.sendBuffer(topicLength)
        this.sendString(topic)
        this.sendBuffer(QS) //Quality of service

     


        this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        basic.pause(200)
        this.clearUARTRxBuffer();

        control.inBackground(function () {
            while(1){
                basic.pause(10000);
                
                this.pingAdafruitMQTT(50);

            }

            
        })
        
    }
    
    // -------------- 3. Cloud ----------------
    //% blockId=getMQTTMessage
    //% block="$this| Get MQTT Message on click$clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE"  
    getMQTTMessage(): string {
        return this.MQTTMessage
    }
  
        //% blockId=createVariable
        //% block="$this| Create Variable -> Api Key:%Key Name %Name on click%clickBoardNum"
        CreateVariable(Key: string, Name: string): void {
            // Add code here
            let getData ="\{\r\n\"key\": \"9qvfccbdk0jrgfeh\",\r\n\"cmd\": \"CREATE_VARIABLE\",\r\n\"name\": \"msdsdfsfd\",\r\n\"value\": \"Hello my name is Josiah\"\r\n}\";"
    
            this.sendString("AT+CIPMUX=1\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        
            this.sendString("AT+CIPSTART=0,\"TCP\",\"https://cloud.brilliantlabs.ca\",80\r\n"); 
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        
            this.sendString(
                    "AT+CIPSEND=0," + getData.length.toString() + "\r\n");
                    this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
        
                    this.sendString(getData);
                    this.response = this.WiFiResponse("OK", true, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

        }


   // -------------- 3. Cloud ----------------
    //% blockId=isMQTTMessage
    //% block="$this| Is MQTT Message Available on click%clickBoardNum ?"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7
    //% this.defl="WiFi_BLE" 
    isMQTTMessage(): boolean{
        let startIndex = 0;
        let remainingLength = 0;
        let topicLength = 0;
       if(this.UARTRawData.length > 300){
        this.UARTRawData = ""
       }
      if(this.isUARTDataAvailable() || this.UARTRawData.length > 0) //Is new data available OR is there still unprocessed data?
      {
    
            this.UARTRawData = this.UARTRawData + this.getUARTData(); // Retrieve the new data and append it
   
            let IPDIndex = this.UARTRawData.indexOf("+IPD,0,") //Look for the ESP WiFi response +IPD which indicates data was received
            if(IPDIndex !== -1) //If +IPD, was found 
            {
            
                
                startIndex = this.UARTRawData.indexOf(":") //Look for beginning of MQTT message (which comes after the :)
               
                if(startIndex != -1) //If a : was found
                {
                    let IPDSizeStr = this.UARTRawData.substr(IPDIndex+7,startIndex-IPDIndex-7) //The length of the IPD message is between the , and the :
                   
                    
                    let IPDSize = parseInt(IPDSizeStr)
                    if(this.UARTRawData.length >= IPDSize + startIndex + 1) //Is the whole message here?
                    {

                        startIndex += 1; // Add 1 to the start index to get the first character after the ":"

                        if(this.UARTRawData.charCodeAt(startIndex) != 0x30) //If message type is not a publish packet
                        {

                            return false; //Not a publish packet

                        }
                        
                        remainingLength = this.UARTRawData.charCodeAt(startIndex + 1); //Extract the remaining length from the MQTT message (assuming RL < 127)
        
                        topicLength = this.UARTRawData.charCodeAt(startIndex + 3); //Extract the topic length from the MQTT message (assuming TL < 127)
                    
                        this.MQTTMessage  = this.UARTRawData.substr(startIndex + 4+topicLength,remainingLength-topicLength-2)
                    
                        this.UARTRawData = this.UARTRawData.substr(IPDSize + startIndex,this.UARTRawData.length-1) //Remove all data other than the last character (in case there is no more data)
                 
                        return true; //Message retrieved
                      
                    }
              
                    
                }
            }
     

        }
            return false;
            
    }


    // -------------- 3. Cloud ----------------
    //% blockId=pingAdafruitMQTT
    // block="$this Ping Adafruit MQTT every $pingInterval seconds on click$clickBoardNum"
    //% group="MQTT Adafruit"
    //% weight=70   
    //% blockGap=7  
    //% pingInterval.min=1 pingInterval.max=59
    //% advanced=false
    //% this.defl="WiFi_BLE" 
    pingAdafruitMQTT(pingInterval: number) 
    {
        if(this.pingActiveAdafruit == false)
        {
            this.lastPingAdafruit = input.runningTime();
            let controlPacket = pins.createBuffer(1);
            controlPacket.setNumber(NumberFormat.UInt8LE,0,0xC0); //Subscribe Control Packet header
            let remainingLength = pins.createBuffer(1) //size of remaining Length packet
            remainingLength.setNumber(NumberFormat.UInt8LE,0,0x00); //Remaining Length = 0 
    
            this.sendString("AT+CIPSEND=0,2\r\n")
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"
            this.sendBuffer(controlPacket);
            this.sendBuffer(remainingLength);
            this.response = this.WiFiResponse("OK", false, this.defaultWiFiTimeoutmS); //Wait for the response "OK"

            this.pingActiveAdafruit = true;
        }
        else //If a ping has been sent
        {
            if ((input.runningTime() - this.lastPingAdafruit) > pingInterval*1000) 
            {
                this.pingActiveAdafruit = false;
            }
        }
        
    
            
        
    }
}
}
