import generateRandomId from 'quickidgen';

export const randomOtp=()=>{
    const customId = generateRandomId({
        length: 6,
        useNumbers: true,
        useLowercase: false,
        useUppercase: false,
        useSpecialChars: false,
      });
      return customId

}

export const randomId=()=>{
  const customId = generateRandomId({
      length: 8,
      useNumbers: true,
      useLowercase: false,
      useUppercase: true,
      useSpecialChars: false,
    });
    return customId

}