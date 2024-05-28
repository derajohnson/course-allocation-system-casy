import { Button } from "@/components/ui/button";
import CourseAllocated from "./ViewAllocation";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <div className="bg-cover bg-center w-full bg-[url('/hero.jpg')]">
        <div className="text-right pt-10 px-10">
          <Link href="/login">
            <Button>Log in as staff</Button>
          </Link>
        </div>

        <div className="h-[50vh] text-center justify-around items-center flex">
          <div>
            <h1 className="text-3xl font-bold">Course Allocation System Uniport</h1>
            <p className="text-2xl mt-4">A Streamlined Approach to Course Allocation</p>
          </div>
        </div>
      </div>
      <CourseAllocated />
    </div>
  );
};

export default HomePage;
