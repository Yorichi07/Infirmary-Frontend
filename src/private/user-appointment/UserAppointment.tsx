import Shared from "@/Shared";
import "./UserAppointment.scss";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UserAppointment = () => {
  const [followUp, setFollowUp] = useState("");

  return (
    <div className="appointment-container">
      <div className="appointment-container__content">
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea
          placeholder="Enter allergies (if any)"
          id="allergies"
          className="w-full mb-5"
        />
        <div className="flex mb-5">
          <div className="flex gap-2 flex-col w-[15%]">
            <Label htmlFor="followUp">Is this a follow up?</Label>
            <div className="flex align-items-center" id="followUp">
              <RadioButton
                inputId="followUpYes"
                name="followUp"
                value="Yes"
                onChange={(e) => setFollowUp(e.value)}
                checked={followUp === "Yes"}
              />
              <label htmlFor="followUpYes" className="ml-2">
                Yes
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="followUpNo"
                name="followUp"
                value="No"
                onChange={(e) => setFollowUp(e.value)}
                checked={followUp === "No"}
              />
              <label htmlFor="followUpNo" className="ml-2">
                No
              </label>
            </div>
          </div>
          <div className="w-[85%] flex items-baseline">
            <Label htmlFor="aDate" className="w-[30%]">
              If yes, then last appointment date?
            </Label>
            <Input type="date" id="aDate" className="mb-3" />
          </div>
        </div>
        <Label htmlFor="doctor">Preferred doctor (if any)</Label>
        <Select>
          <SelectTrigger id="doctor" className="w-[30%] trigger mb-5">
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="saluke">Mr. Saluke</SelectItem>
              <SelectItem value="tarika">Ms. Tarika</SelectItem>
              <SelectItem value="virender">Mr.Virender</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor="reasonForPref">Reason for Preference?</Label>
        <Textarea
          placeholder="Enter reason for preference (if preferred)"
          id="reasonForPref"
          className="w-full mb-5"
        />
      </div>
      <div className="appointment-container__footer">
        <Button variant="outline" className="back-btn">
          Back
        </Button>
        <Button className="save-btn text-white">Save</Button>
      </div>
    </div>
  );
};

export default UserAppointment;
