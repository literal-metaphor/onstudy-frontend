import AssignmentCard from "../components/AssignmentCard";
import ClassroomCard from "../components/ClassroomCard";

export default function Search() {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="flex col-span-7 bprder 4 border-r-gray-400">
            <AssignmentCard id={""} title={""} description={""} classroom={""} teacher={""} teacherPhoto={null} deadline={""} counts={0}></AssignmentCard>
          </div>
          <div className="grid grid-cols-2">
            <ClassroomCard id={""} name={""} teacher={""} subject={""}></ClassroomCard>
          </div>
        </div>
      </div>
    </>
  );
}
