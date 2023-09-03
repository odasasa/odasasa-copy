interface KeyedObject {
    [key: string]: any;
  }
  
  export function objectToArrayOfObjects(obj: KeyedObject): Array<KeyedObject> {
    const keyValueArray: Array<KeyedObject> = [];
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keyValueObject: KeyedObject = {};
        keyValueObject[key] = obj[key];
        keyValueArray.push(keyValueObject);
      }
    }
  
    return keyValueArray;
  }
  
  