import React, { useState } from "react";
import "./UserProfile.scss";
import { Image } from "primereact/image";
import Shared from "@/Shared";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserProfile = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-container__header">
        <img src='/upes-logo2.jpg' alt="UPES Logo" />
        <div className="title">
          {Shared.User}
          <h1>Patient Profile</h1>
        </div>
      </div>
      <div className="profile-container__content">
        <div className="profile-container__body">
          <div className="image-container">
            <Image
              src={uploadedImage || '/default-user.jpg'}
              alt="Profile Picture"
              preview
              style={{
                border: "1px solid black",
                display: "flex",
                maxWidth: "200px",
                maxHeight: "200px",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="upload-image"
              style={{ display: "none" }}
            />
            <label htmlFor="upload-image" className="upload-button">
              Upload Image
            </label>
          </div>
          <div className="patient-details">
            <div className="patient-details__top">
              <div className="patient-details__left">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                />
                <Label htmlFor="school">School</Label>
                <Input
                  type="text"
                  id="school"
                  placeholder="School"
                  className="mb-3"
                />
                <Label htmlFor="dob">Date of Birth</Label>
                <Input type="date" id="dob" className="mb-3" />
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  type="number"
                  id="height"
                  placeholder="Height"
                  className="mb-3"
                />
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger id="gender" className="w-full trigger">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="patient-details__right">
                <Label htmlFor="number">Patient Id</Label>
                <Input
                  type="number"
                  id="patientId"
                  placeholder="Patient Id"
                  className="mb-3"
                />
                <Label htmlFor="program">Program</Label>
                <Input
                  type="text"
                  id="program"
                  placeholder="Program"
                  className="mb-3"
                />
                <Label htmlFor="eContact">Emergency Contact</Label>
                <Input
                  type="number"
                  id="eContact"
                  placeholder="Emergency Contact"
                  className="mb-3"
                />
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Weight"
                  className="mb-3"
                />
                <Label htmlFor="bloogGroup">Blood Group</Label>
                <Input
                  type="text"
                  id="bloodGroup"
                  placeholder="Blood Group"
                  className="mb-3"
                />
              </div>
            </div>
            <Label htmlFor="medH">Medical History</Label>
            <Textarea
              placeholder="Enter your medical history"
              id="medH"
              className="w-full mb-3"
            />
            <Label htmlFor="fMedH">Family Medical History</Label>
            <Textarea
              placeholder="Enter your family medical history"
              id="fMedH"
              className="w-full mb-3"
            />
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              placeholder="Enter allergies (if any)"
              id="allergies"
              className="w-full mb-3"
            />
          </div>
        </div>
          <div className="profile-container__footer">
            <Button variant="outline" className="back-btn">
              Back
            </Button>
            <Button className="save-btn text-white">Save</Button>
          </div>
      </div>
      <div className="helpline">Helpline: 1800-XXXX-XXXX</div>
    </div>
  );
};

export default UserProfile;
