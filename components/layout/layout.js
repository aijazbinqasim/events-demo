import NavBar from "./navbar";

function Layout(props) {
  return (
    <>
      <NavBar />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
