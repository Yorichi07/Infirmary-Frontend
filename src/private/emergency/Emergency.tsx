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
    <div className="min-h-[83svh] flex items-center justify-center max-lg:flex-col max-lg:min-h-[93svh]">
      <img
        src="/emergencyBg.png"
        className="w-[40%] max-lg:hidden"
        alt="emergency png"
      />

      <div className="max-lg:py-4 min-h-[80%] min-w-[60%] flex items-center justify-center gap-8 max-lg:min-w-[100%] max-lg:flex-col  max-lg:min-h-[90%] max-lg:gap-6">
        <Card className="hover:-translate-y-1 transition ease-in duration-200 min-h-[100%] min-w-[30%] items-center text-center flex flex-col justify-center bg-slate-200 shadow-xl max-lg:w-[90%]">
          <CardHeader>
            <CardTitle>Dr. Ramesh Kumar</CardTitle>
            <CardDescription>Cardiologist</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007
            </p>
          </CardContent>
          <CardFooter>
            <p>+91 12345 67891</p>
          </CardFooter>
        </Card>
        <Card className="hover:-translate-y-1 transition ease-in duration-200 min-h-[100%] min-w-[30%] items-center text-center flex flex-col justify-center bg-slate-200 shadow-xl max-lg:w-[90%]">
          <CardHeader>
            <CardTitle>Dr. Anjali Mehta</CardTitle>
            <CardDescription>Pediatrician</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007
            </p>
          </CardContent>
          <CardFooter>
            <p>+91 12345 65846</p>
          </CardFooter>
        </Card>
        <Card className="hover:-translate-y-1 transition ease-in duration-200 min-h-[100%] min-w-[30%] items-center text-center flex flex-col justify-center bg-slate-200 shadow-xl max-lg:w-[90%]">
          <CardHeader>
            <CardTitle>Dr. Suresh Gupta</CardTitle>
            <CardDescription>Orthopedic Surgeon</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Basement, Block-4, UPES, Bidholi, Dehradun, Uttarakhand, 248007
            </p>
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
