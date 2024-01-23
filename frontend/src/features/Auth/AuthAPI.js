// A mock function to mimic making an async request for data



export function CreateUser(userInfo) {
  return new Promise(async (resolve,reject) => {
    // console.log(userInfo);
    let response = await fetch("https://apnacart.vercel.app/auth", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: { "content-type": "application/json" },
    });

    try {
      let data = await response.json();
    if(response.status ===200){
      resolve({data})
    }
    else{
      reject("something wrong")
    }
    } catch (error) {
      reject(error)
    }
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://apnacart.vercel.app/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // console.log(response,data)
      if (response.status === 200) {
        resolve({ data });
        // console.log(data)
        localStorage.setItem('user',JSON.stringify(data))
      } else {
        reject({ data });
      }
    } catch (error) {
      reject( error );
    }

  });
}
export function loginDemoUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://apnacart.vercel.app/auth/loginDemo', {
        method: 'POST',
        // body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // console.log(response,data)
      if (response.status === 200) {
        resolve({ data });
        console.log(data,"data")
        localStorage.setItem('user',JSON.stringify(data))
      } else {
        reject({ data });
      }
    } catch (error) {
      reject( error );
    }

  });
}
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://apnacart.vercel.app/auth/resetPasswordRequest', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
        console.log(error)
      }
    } catch (error) {
      reject( error );
    }

  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://apnacart.vercel.app/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}
