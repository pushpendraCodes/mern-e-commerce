// A mock function to mimic making an async request for data


export function AddToCart(item,token) {
  return new Promise(async (resolve, reject) => {
    let response = await fetch("http://localhost:4000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json",
      authorization:token , },
    });

    try {
      let data = await response.json();
      console.log(data);
      resolve({data});
    } catch (error) {
      reject("something wrong");
    }
  });
}
export function getUserCart(user) {
  return new Promise(async (resolve) => {
    console.log(user);
    let response = await fetch("http://localhost:4000/cart/" + user.user,
    {
      headers: { "content-type": "application/json",
      authorization:user.token , },
    }

    );
    let data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
export function removeProduct(productId,token) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart/" + productId, {
      method: "DELETE",
      body: JSON.stringify({ id: productId }),
      headers: { "content-type": "application/json" ,
      authorization:token },
    });
    let data = await response.json();
    console.log(data);
    resolve({ productId });
  });
}
export function handelqunatity(value) {
  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:4000/cart/" + value.id, {
      method: "PATCH",
      body: JSON.stringify(value),
      headers: { "content-type": "application/json",
      authorization:value.token  },
    });
    let data = await response.json();
    console.log(data);
    resolve({ data});
  });
}
export function resetCart(user_id) {
  return new Promise(async (resolve) => {
    console.log(user_id);
    let user = JSON.parse(localStorage.getItem("user"))
    let response = await getUserCart(user);
    let items = await response.data;
    console.log(items);
    for (let item of items) {
      await removeProduct(item.id,user.token);
    }

    console.log(items);
    resolve({ success: "success" });
  });
}
