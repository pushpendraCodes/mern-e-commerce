
let user = JSON.parse(localStorage.getItem("user"))


  export function fetchLoggedInUser(user) {
    return new Promise(async (resolve) =>{
      console.log(user.user,"sjbdu")
      const response = await fetch('https://mern-e-commerce-blond.vercel.app/user/'+user.user,
      {
        headers: {
          "Content-Type": "application/json",
          authorization:user.token ,
        },
      }
      )
      const data = await response.json()
      console.log(data)
      resolve({data})

    }
    );
  }
  export function fetchOrdersByUserId( pagination,id) {
    let queryString = "";
    console.log(pagination)
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    console.log(queryString, "queryString");
    return new Promise(async (resolve) => {
      let response = await fetch("https://mern-e-commerce-blond.vercel.app/order/user?" + queryString,
      {
        method: "POST",
        body: JSON.stringify({id:id}),
        headers: { "content-type": "application/json",
        authorization:user.token ,

      },
      }
      );
      let data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: data, totalOrders: totalItems });
      console.log(data);
    });
  }


  export function UpdateUser(info) {
    return new Promise(async (resolve) => {
  // console.log(update)
      let response = await fetch("https://mern-e-commerce-blond.vercel.app/user/"+info.id, {
        method: "PATCH",
        body: JSON.stringify(info),
        headers: { "content-type": "application/json" ,
        authorization:user.token ,},
      });

      let data = await response.json();
      console.log(data);
      resolve({data});

    });
  }