
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {

  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-3xl mx-auto text-white py-10 px-2">
          <div className="text-center">
            <h3 className="text-3xl mb-3"> Download our Ecommerce App </h3>
            <p> Buy what you want. </p>
            <div className="flex justify-center my-10">
              <div className="flex items-center border  rounded-lg px-4 py-2 w-52 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Google Play Store </p>
                </div>
              </div>
              <div className="flex items-center border  rounded-lg px-4 py-2 w-44 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  className="w-7 md:w-8"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-200">Download on </p>
                  <p className="text-sm md:text-base"> Apple Store </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-3 md:order-1 mt-8 md:mt-0">
              {" "}
              © Apna E-commerce, 2023.{" "}
            </p>

            <div className="flex space-x-4 my-5  order-2 md:order-2 ">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com/pushpendrpatel" className="text-blue-300 hover:text-blue-400">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-600">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://www.linkedin.com/in/pushpendra-patel-2b2130235/" className="text-blue-900  hover:text-blue-800">
              <i si class="fab fa-linkedin-in fa-lg "></i>
              </a>
            </div>
            <div className="order-1 md:order-3 cursor-pointer">
              <span className="px-2  ">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
