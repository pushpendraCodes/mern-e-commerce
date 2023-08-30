
// let user = JSON.parse(localStorage.getItem("user"))


  export function fetchLoggedInUser(user) {
    return new Promise(async (resolve) =>{
      // console.log(user.user,"sjbdu")
      const response = await fetch('https://apnacart.vercel.app/user/'+user.user,
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
  export function fetchOrdersByUserId( pagination,id,token) {
    let queryString = "";
    // console.log(pagination)
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    // console.log(queryString, "queryString");
    return new Promise(async (resolve) => {
      let response = await fetch("https://apnacart.vercel.app/order/user?" + queryString,
      {
        method: "POST",
        body: JSON.stringify({id:id}),
        headers: { "content-type": "application/json",
        authorization:token ,

      },
      }
      );
      let data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: data, totalOrders: totalItems });
      // console.log(data);
    });
  }


  export function UpdateUser(newAds,token) {
    return new Promise(async (resolve) => {
  console.log(newAds,"newAds")
      let response = await fetch("https://apnacart.vercel.app/user/"+newAds.id, {
        method: "PATCH",
        body: JSON.stringify(newAds),
        headers: { "content-type": "application/json" ,
        authorization:token ,},
      });

      let data = await response.json();
      // console.log(data);
      resolve({data});

    });
  }