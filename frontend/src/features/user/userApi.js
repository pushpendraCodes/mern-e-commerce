
let user = JSON.parse(localStorage.getItem("user"))


  export function fetchLoggedInUser(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:4000/user/'+userId,
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
      let response = await fetch("http://localhost:4000/order/user?" + queryString,
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
      let response = await fetch("http://localhost:4000/user/"+info.id, {
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