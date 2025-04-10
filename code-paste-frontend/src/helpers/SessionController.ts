class StorageItem {
  private itemName: string;

  constructor(itemName: string) {
    this.itemName = itemName;
  }

  setValue(value: string) {
    sessionStorage.setItem(this.itemName, value);
  }

  getValue() {
    return sessionStorage.getItem(this.itemName);
  }

  removeValue() {
    return sessionStorage.removeItem(this.itemName);
  }
}

class CustomSesionStorage {
  private userName = 'user_name';
  private userId = 'user_id';

  private storageItems = new Map<string, StorageItem>([
    [this.userName, new StorageItem(this.userName)],
    [this.userId, new StorageItem(this.userId)],
  ]);

  getUserName() : StorageItem {
    return this.storageItems.get(this.userName)!
  }

  getUserId() : StorageItem {
    return this.storageItems.get(this.userId)!
  }
}

const customSesionStorage = new CustomSesionStorage();

export default customSesionStorage;
