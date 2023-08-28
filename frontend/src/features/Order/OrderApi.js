// let user = JSON.parse(localStorage.getItem("user"))
// create order
export function CreateOrder(order,token) {
    return new Promise(async (resolve) => {

      let response = await fetch("http://localhost:4000/order", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json",
        authorization:token },
      });

      let data = await response.json();
      console.log(data);
      resolve({data});
    });
  }




  // update order
export function updateOrder(order,token) {
    return new Promise(async (resolve) => {

      let response = await fetch("http://localhost:4000/order/"+order.id, {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json",
        authorization:token , },
      });

      let data = await response.json();
      console.log(data);
      resolve({data});
    });
  }

  // fetch total orders with filter & sort for admin
  export function fetchTotalOrders(pagination,sort ,search_query,token) {
    let queryString =""
    console.log(pagination,sort);
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in search_query) {
      queryString += `${key}=${sort[key]}&`;
    }

    console.log(queryString);
    return new Promise(async (resolve) => {
      let response = await fetch("http://localhost:4000/order?"+queryString,
      {
        headers: { "content-type": "application/json",
        authorization:token },
      });
      let data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: data, totalOrders: totalItems });
      console.log(data);
    });
  }



