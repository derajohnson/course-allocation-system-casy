"use client";

import { IndividualCourse } from "@/models/Courses";
import { handleGetIndividualCourse } from "@/services/Courses";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CourseDescription = () => {
  const params = useParams();
  const slug = params.slug;
  const [individualCourse, setIndividualCourse] = useState<IndividualCourse>();

  useEffect(() => {
    async function getIndividualCourse() {
      const data = await handleGetIndividualCourse(slug as string);
      setIndividualCourse(data);
    }
    getIndividualCourse();
  }, [slug]);

  return (
    <div>
      <Link href="/">
        <p className="ml-4 mt-4 hover:underline">Go Back </p>
      </Link>
      <div
        className="container flex w-full justify-center mx-auto px-48 my-10"
        id="course-allocated"
      >
        <div>
          <h1 className="text-2xl text-center font-bold ">{individualCourse?.data.course_title}</h1>
          <div className="flex gap-10 justify-center my-3">
            <p>Session: {individualCourse?.data.session} </p>
            <p>Year: {individualCourse?.data.level.slice(0, 1)}</p>
            <p>Credit unit: {individualCourse?.data.credit_unit}</p>
            <p>
              Course code: {individualCourse?.data.course_code}
              {individualCourse?.data.semester === "first" ? ".1" : ".2"}{" "}
            </p>
          </div>

          <div>
            <p className="text-gray-700 text-xl font-semibold mb-2">Lecturers</p>
            <p className="text-gray-700">
              Head Lecturer:{" "}
              <span className="font-bold text-black">
                {individualCourse?.data.head_lecturer.title}{" "}
                {individualCourse?.data.head_lecturer.name}
              </span>
            </p>
            <p className="text-gray-700">
              Assistant Lecturer:{" "}
              <span className="font-bold text-black">
                {individualCourse?.data.assistant_lecturer.title}{" "}
                {individualCourse?.data.assistant_lecturer.name}
              </span>
            </p>
          </div>

          <div className="my-20">
            <p className="text-gray-700 text-xl font-semibold mb-2">Description</p>

            <div>{individualCourse?.data.course_description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
