export interface CallSession {
  roomName: string;
  callUrl: string;
}

export interface CallProvider {
  createCallRoom(requestId: string): Promise<CallSession>;
}

export class JitsiCallProvider implements CallProvider {
  async createCallRoom(requestId: string): Promise<CallSession> {
    const roomName = `share-tray-help-${requestId}-${Date.now().toString(36)}`;
    const callUrl = `https://meet.jit.si/${roomName}`;
    return { roomName, callUrl };
  }
}

export interface LiveCaption {
  textVi: string;
  textEn: string;
  speaker: 'traveller' | 'volunteer';
  timestamp: string;
}

export interface InterpreterProvider {
  getCaptions(sessionId: string): Promise<LiveCaption[]>;
}

export class StubInterpreterProvider implements InterpreterProvider {
  async getCaptions(): Promise<LiveCaption[]> {
    // Stub captions for MVP
    return [
      {
        textVi: 'Chào bạn, mình là Minh Anh đây. Quán phở này không tính thêm tiền quẩy đâu nhé!',
        textEn: "Hello! Minh Anh here. This pho shop doesn't charge extra for the cruller condiments!",
        speaker: 'volunteer',
        timestamp: new Date().toISOString(),
      },
      {
        textVi: 'Cảm ơn Minh Anh rất nhiều!',
        textEn: 'Thank you so much Minh Anh!',
        speaker: 'traveller',
        timestamp: new Date().toISOString(),
      },
    ];
  }
}

export const callProvider = new JitsiCallProvider();
export const interpreterProvider = new StubInterpreterProvider();
