import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Ambulance = () => {
  return (
    <div className="h-[83svh] pl-10 flex items-center justify-center max-lg:h-[93svh] max-lg:pl-0">
      <img
        src="/Ambulance.png"
        className="w-[40%] max-lg:hidden"
        alt="emergency png"
      />

      <div className="h-[80%] w-[60%] flex items-center justify-center gap-14 max-lg:w-[100%] max-lg:flex-col  max-lg:h-[90%] max-lg:gap-6">
        <Card className="hover:-translate-y-1 transition ease-in duration-200 h-[100%] w-[40%] items-center flex flex-col justify-center bg-slate-200 shadow-xl max-lg:w-[90%]">
          <CardHeader>
            <CardTitle>Ram Kumar</CardTitle>
            <CardDescription>Bidholi Campus</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <b className="text-center">Basic Life Support Ambulance</b>
            <p className="text-justify">Equipped with essential medical equipment such as oxygen cylinders, basic medical supplies, and a trained paramedic for non-critical patients.</p>
          </CardContent>
          <CardFooter>
          <p><b>Phone: </b>+91 12345 65846</p>
          </CardFooter>
        </Card>
        <Card className="hover:-translate-y-1 transition ease-in duration-200 h-[100%] w-[40%] items-center flex flex-col justify-center bg-slate-200 shadow-xl max-lg:w-[90%]">
          <CardHeader>
            <CardTitle>Shyam Kumar</CardTitle>
            <CardDescription>Kandoli Campus</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
          <b>Basic Life Support Ambulance</b>
          <p className="text-justify">Equipped with essential medical equipment such as oxygen cylinders, basic medical supplies, and a trained paramedic for non-critical patients.</p>
          </CardContent>
          <CardFooter>
            <p><b>Phone: </b>+91 12345 65846</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Ambulance;
