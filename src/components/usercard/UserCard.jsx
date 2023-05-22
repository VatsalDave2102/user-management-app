import { Card, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./UserCard.css";
const UserCard = () => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  return (
    <Card
      style={{ width: "25rem" }}
      className={
        "justify-content-center align-items-center d-flex shadow border-0  "
      }
    >
      {/* Image */}
      <Image
        src={loggedInUser.image}
        className="card-img mt-2"
        roundedCircle
        thumbnail
      />

      {/* User data */}
      <Card.Body className="w-100 d-flex flex-column align-items-center">
        {/* Name */}
        <h1 className=" text-center name w-100 d-flex justify-content-center">
          {loggedInUser.name}
        </h1>

        {/* Mail */}
        <p className="m-0">{loggedInUser.email}</p>
        <p className="m-0"> {loggedInUser.phone}</p>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
