import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardType = {
  name: string;
  title: string;
  phone: string;
  email: string;
  designation: string;
  department: string;
};

const ProfileCard = ({ name, title, phone, email, designation, department }: CardType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title}, {name}
        </CardTitle>
        <CardDescription>{designation}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-3">department: {department}</p>
        <p className="mb-3">email: {email}</p>
        <p className="mb-3">phone number: {phone}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
