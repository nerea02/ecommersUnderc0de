export default function OpcionesHeader({ opcione }) {
  return (
    <li className="d-flex align-items-center">
      <a
        className="roboto-medium"
        href={
          opcione == "PRODUCTO"
            ? "/"
            : opcione == "SOBRE NOSOTROS"
            ? "/AboutUs"
            : opcione == "NUEVAS TENDENCIAS"
            ? "/newTrends"
            : ""
        }
      >
        {opcione}
      </a>
    </li>
  );
}
