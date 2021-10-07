import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatService } from './chat.service';
import Message from './message/message.entity';

const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
  
};

describe('ChatService', () => {
  let service: ChatService;
  let messagesRepositoryMock: Repository<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService,
        {
          provide: getRepositoryToken(Message),
          useClass: Repository
        }
      ]
      
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMessages', () => {
    it('should return Promise<Messagees[]>', async () => {
      const message = new Message();
      const message1 = new Message();
      const result = [message, message1];

      jest.spyOn(service, 'getAllMessages').mockImplementation(async () => result);

      expect(await service.getAllMessages()).toBe(result);
    });
  });
  describe
});

describe("WebSockets connect", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Test connection", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });
  
});
