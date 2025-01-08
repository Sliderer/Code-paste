import * as grpc from '@grpc/grpc-js';
// import { TextStreamingServiceClient } from './generated/streaming_grpc_pb';
// import { TextRequest } from './generated/streaming_pb';

class ClientServerAPI {
    async uploadDocument(data: Uint8Array<ArrayBufferLike>) {
        // const client = new TextStreamingServiceClient(
        //     'localhost:50051',
        //     grpc.credentials.createInsecure()
        //   );
          
        //   const call = client.streamText();
          
        //   // Ловим данные от сервера
        //   call.on('data', (response) => {
        //     console.log('Server response:', response.getText());
        //   });
          
        //   call.on('end', () => {
        //     console.log('Streaming ended.');
        //   });
          
        //   // Отправляем стрим данных на сервер
        //   const texts = ['Hello, server!', 'How are you?', 'This is streaming!'];
        //   texts.forEach((text) => {
        //     const request = new TextRequest();
        //     request.setText(text);
        //     call.write(request);
        //   });
          
        //   // Заканчиваем стрим
        //   call.end();
    }
}

export default ClientServerAPI;