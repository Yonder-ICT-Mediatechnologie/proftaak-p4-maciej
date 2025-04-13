import { Value } from "../utils/Value";

class Class {
  private static instance: Class;
    Room = new Value<Room | undefined>()

  private constructor() {
    console.log("Initializing Class...");
  }

  public static get(): Class {
    if (!Class.instance) {
      Class.instance = new Class();
    }
    return Class.instance;
  }
}

export const RoomController = Class.get()
