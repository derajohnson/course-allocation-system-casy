export type Lecturer = {
  data: {
    department: string;
    designation: string;
    email: string;
    fullname: string;
    phone_number: string;
    title: string;
  };
};

export type ListOfLecturers = {
  data: [
    {
      department: string;
      designation: string;
      email: string;
      fullname: string;
      phone_number: string;
      title: string;
      _id?: string | undefined;
    },
  ];
};
