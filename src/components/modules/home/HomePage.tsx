import { Button } from "@/components/ui/button";
import CourseAllocated from "./ViewAllocation";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <div className="flex h-screen text-center justify-around items-center bg-cover bg-center w-full bg-[url('/hero.jpg')]">
        <div>
          <h1 className="text-3xl font-bold">Course Allocation System Uniport</h1>
          <p className="text-2xl mt-4">A Streamlined Approach to Course Allocation</p>
          <div className="mt-10 gap-4 flex justify-center">
            <Link href="#course-allocated" scroll={false}>
              <Button>View Course Allocation</Button>
            </Link>
            <Button>Admin log in</Button>
          </div>
        </div>
      </div>
      <CourseAllocated />
    </div>
  );
};

export default HomePage;
