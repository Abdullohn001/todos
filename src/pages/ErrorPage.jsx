import { useRouteError, NavLink } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className="text-centar pt-10 h-lvh">
        <h1 className="text-center mb-5 text-3xl font-bold">
          👇PageNotFound👇
        </h1>
        <p className="mb-5 text-center text-xl">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          rem corporis veritatis sint, velit at nobis eum consectetur, autem
          odio numquam tempora vel sunt, possimus atque non amet libero!
          Doloribus voluptates porro unde non soluta. Quibusdam voluptas laborum
          optio ducimus, a minus debitis amet sit accusamus, ad reiciendis, quos
          quis.
        </p>
        <div className="w-full text-center pt-5">
          <NavLink
            className="rounded-xl font-medium no-underline text-[#333] py-2 px-3 border-2 border-solid border-[#333] bg-white hover:bg-[#333] hover:text-white"
            to="/"
          >
            Home Page
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="text-centar pt-10 h-lvh">
      <h1 className="text-center mb-5 text-3xl font-bold">
        👇Somthing went wrong :(👇
      </h1>

      <p className="mb-5 text-center text-xl font-medium">{error.message}</p>

      <div className="w-full text-center pt-5">
        <NavLink
          className="rounded-xl font-medium no-underline text-[#333] py-2 px-3 border-2 border-solid border-[#333] bg-white hover:bg-[#333] hover:text-white"
          to="/"
        >
          Home Page
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
