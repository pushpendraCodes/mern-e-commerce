// A mock function to mimic making an async request for data
let user = JSON.parse(localStorage.getItem("user"))
export function CreateUser(userData) {
  return new Promise(async (resolve) => {
    console.log(userData);
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });

    let data = await response.json();
    console.log(data);
    resolve({data});
  });
}

export function loginUser(userData) {
  return new Promise(async (resolve,reject) => {

    let email = userData.email;
    let pass = userData.password;

    let response = await fetch("https://mern-e-commerce-blond.vercel.app/users?email=" + email);
    let data = await response.json();
    console.log(data);
    if (data.length) {
      if (pass===data[0].password  ) {
        resolve({data:data[0]} );

        localStorage.setItem('user',JSON.stringify(data[0]))
      }else{
        reject({msg:"wrong credentials"})
      }
    }else{
      reject({msg:"user Not Found"})
    }
  });
}
export function UpdateUser(update) {
  return new Promise(async (resolve) => {
console.log(update)
    let response = await fetch("https://mern-e-commerce-blond.vercel.app/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });

    let data = await response.json();
    console.log(data);
    resolve({data});
    localStorage.setItem('user',JSON.stringify(data))
  });
}