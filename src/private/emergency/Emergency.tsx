import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Emergency = () => {
  return (
    <div className="h-[83%] flex items-center justify-center] ">
      <img
        src="/public/emergencyBg.png"
        className="w-[40%]"
        alt="emergency png"
      />

      <div className="h-[80%] w-[60%] flex items-center justify-center gap-8">
        <Card className="hover:-translate-y-1 transition ease-in duration-200 h-[100%] w-[30%] items-center text-center flex flex-col justify-center bg-slate-200">
          <CardHeader>
            <CardTitle>Dr. Ramesh Kumar</CardTitle>
            <CardDescription>Cardiologist</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007</p>
          </CardContent>
          <CardFooter>
            <p>+91 12345 67891</p>
          </CardFooter>
        </Card>
        <Card className="hover:-translate-y-1 transition ease-in duration-200 h-[100%] w-[30%] items-center text-center flex flex-col justify-center bg-slate-200">
          <CardHeader>
            <CardTitle>Dr. Anjali Mehta</CardTitle>
            <CardDescription>Pediatrician</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007</p>
          </CardContent>
          <CardFooter>
            <p>+91 12345 65846</p>
          </CardFooter>
        </Card>
        <Card className="hover:-translate-y-1 transition ease-in duration-200 h-[100%] w-[30%] items-center text-center flex flex-col justify-center bg-slate-200">
          <CardHeader>
            <CardTitle>Dr. Suresh Gupta</CardTitle>
            <CardDescription>Orthopedic Surgeon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007</p>
          </CardContent>
          <CardFooter>
            <p>+91 56789 45612</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
