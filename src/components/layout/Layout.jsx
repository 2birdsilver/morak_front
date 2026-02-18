import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="wrap">
        <div className="container">
          <Outlet />
        </div>
      </div>
      ;
    </>
  );
}

export default Layout;
