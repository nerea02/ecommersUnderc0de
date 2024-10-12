export default function OpcionesHeader({ opcione }) {
  return (
    <li className="d-flex align-items-center">
      <a className="roboto-medium" href="">
        {opcione}
      </a>
    </li>
  );
}
