import Link from "next/link";

const CourseDescription = () => {
  return (
    <div>
      <Link href="/">
        <p className="ml-4 mt-4 hover:underline">Go Back </p>
      </Link>
      <div
        className="container flex w-full justify-center mx-auto px-4 my-10"
        id="course-allocated"
      >
        <div>
          <h1 className="text-2xl font-bold ">4th and 5th Generation Programming Language</h1>
          <div className="flex gap-10 justify-center my-3">
            <p>Session: 2022/2023</p>
            <p>Year: 4</p>
            <p>Credit unit: 3</p>
          </div>

          <div>
            <p className="text-gray-700 text-xl font-semibold">Lecturers</p>
            <p className="text-gray-700">Dr Linda Oghenekaro</p>
            <p className="text-gray-700">Dr C.B Marcus</p>
          </div>

          <div className="my-20">lorem ipsum sit amet blah blah blah</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
