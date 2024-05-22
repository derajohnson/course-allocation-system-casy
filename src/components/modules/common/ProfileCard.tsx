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
};

const ProfileCard = ({ name, title, phone, email }: CardType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>email: {email}</p>
      </CardContent>
      <CardFooter>
        <p>phone number: {phone}</p>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
