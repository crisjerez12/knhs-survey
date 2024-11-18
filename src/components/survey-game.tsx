"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import {
  ccAwarenessOptions,
  ccHelpfulnessOptions,
  ccQualityOptions,
  clientTypes,
  genders,
  likertScale,
  questions,
  regions,
} from "@/lib/constants";
import { CCAnswers, Errors, FormData } from "@/lib/types";

export function SurveyGameComponent() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    clientType: "",
    gender: "",
    age: "",
    region: "",
    serviceAvailed: "",
  });
  const [ccAnswers, setCCAnswers] = useState<CCAnswers>({
    awareness: "",
    quality: "",
    helpfulness: "",
  });
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [errors, setErrors] = useState<Errors>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData.formData);
      setCCAnswers(parsedData.ccAnswers);
      setAnswers(parsedData.answers);
      setStep(parsedData.step);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "surveyData",
      JSON.stringify({ formData, ccAnswers, answers, step })
    );
  }, [formData, ccAnswers, answers, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (isFormSubmitted) {
      validateField(name, value);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (isFormSubmitted) {
      validateField(name, value);
    }
  };

  const handleCCChange = (name: string, value: string) => {
    setCCAnswers((prev) => {
      const newAnswers = { ...prev, [name]: value };
      if (name === "awareness" && value === ccAwarenessOptions[3]) {
        newAnswers.quality = "Not applicable";
        newAnswers.helpfulness = "Not applicable";
      } else if (name === "quality" && value !== "") {
        if (newAnswers.helpfulness === "") {
          newAnswers.helpfulness = "Not applicable";
        }
      }
      return newAnswers;
    });
    validateCCFields();
  };

  const validateCCFields = () => {
    const newErrors = { ...errors };
    if (ccAnswers.awareness !== ccAwarenessOptions[3]) {
      if (ccAnswers.quality && !ccAnswers.helpfulness) {
        newErrors.ccHelpfulness = "Please answer this question as well";
      } else {
        delete newErrors.ccHelpfulness;
      }
    }
    setErrors(newErrors);
  };

  const handleAnswer = (value: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[step - 3] = value;
      return newAnswers;
    });
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    switch (name) {
      case "age":
        if (isNaN(Number(value)) || Number(value) < 1 || Number(value) > 120) {
          newErrors[name] = "Please enter a valid age between 1 and 120";
        } else {
          delete newErrors[name];
        }
        break;
      case "serviceAvailed":
        if (value.trim().split(/\s+/).length < 1) {
          newErrors[name] = "Please enter at least one word";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          newErrors[name] = "Please enter only letters, numbers, and spaces";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        if (!value) {
          newErrors[name] = "This field is required";
        } else {
          delete newErrors[name];
        }
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof FormData]);
      if (errors[key]) {
        newErrors[key] = errors[key];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return validateForm();
      case 1:
        return ccAnswers.awareness !== "";
      case 2:
        if (ccAnswers.awareness === ccAwarenessOptions[3]) {
          return true;
        }
        return (
          ccAnswers.quality !== "" &&
          ccAnswers.helpfulness !== "" &&
          Object.keys(errors).length === 0
        );
      default:
        return answers[step - 3] !== "";
    }
  };

  const nextStep = () => {
    setIsFormSubmitted(true);
    if (isStepValid()) {
      if (step === questions.length + 2) {
        setShowConfirmation(true);
      } else {
        setStep((prev) => prev + 1);
      }
    } else {
      setErrors({
        ...errors,
        general:
          "Please fill in all required fields correctly before proceeding.",
      });
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const submitSurvey = () => {
    const surveyData = { formData, ccAnswers, answers };
    console.log("Survey submitted:", surveyData);
    localStorage.removeItem("surveyData");
    setStep(questions.length + 3);
    setShowConfirmation(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: "100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full"
          animate={{
            x: [0, -150, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
            rotate: [0, -270, -540],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg border border-white border-opacity-30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl sm:text-2xl">
              Welcome to Kiamba National Highschool Survey!
            </DialogTitle>
            <DialogDescription className="text-white text-base sm:text-lg">
              We&apos;re excited to hear your thoughts about our school. This
              fun survey will help us improve our services.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowWelcome(false)}
              className="bg-white text-blue-500 hover:bg-blue-100 h-12 text-lg"
            >
              Let&apos;s Begin!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg border border-white border-opacity-30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl sm:text-2xl">
              Confirm Submission
            </DialogTitle>
            <DialogDescription className="text-white text-base sm:text-lg">
              Are you sure you want to submit your survey responses? You
              won&apos;t be able to change them after submission.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="text-white border-white hover:bg-white hover:text-blue-500 h-12 text-lg"
            >
              Review Answers
            </Button>
            <Button
              onClick={submitSurvey}
              className="bg-white text-blue-500 hover:bg-blue-100 h-12 text-lg"
            >
              Submit Survey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-lg rounded-lg border border-white border-opacity-30 p-8"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}
      >
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/logo.jpg"
            alt="Kiamba NHS Logo"
            width={64}
            height={64}
            className="mr-4"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Kiamba NHS Survey
          </h1>
        </div>

        <Progress
          value={(step / (questions.length + 3)) * 100}
          className="mb-6"
        />

        {errors.general && (
          <Alert
            variant="destructive"
            className="mb-6 bg-red-500 bg-opacity-50 text-white border-red-300"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-lg">Error</AlertTitle>
            <AlertDescription className="text-base">
              {errors.general}
            </AlertDescription>
          </Alert>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="clientType"
                  className="text-white text-lg sm:text-xl"
                >
                  Client Type
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("clientType", value)
                  }
                  value={formData.clientType}
                >
                  <SelectTrigger
                    id="clientType"
                    className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                  >
                    <SelectValue placeholder="Select Client Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="text-base sm:text-lg"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.clientType && (
                  <p className="text-red-300 text-base">{errors.clientType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-white text-lg sm:text-xl"
                >
                  Gender
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  value={formData.gender}
                >
                  <SelectTrigger
                    id="gender"
                    className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem
                        key={gender}
                        value={gender}
                        className="text-base sm:text-lg"
                      >
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-300 text-base">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-white text-lg sm:text-xl">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Enter your age (1-120)"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 placeholder-white placeholder-opacity-50 h-12 text-base sm:text-lg"
                />
                {errors.age && (
                  <p className="text-red-300 text-base">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="region"
                  className="text-white text-lg sm:text-xl"
                >
                  Region
                </Label>
                <Select
                  onValueChange={(value) => handleSelectChange("region", value)}
                  value={formData.region}
                >
                  <SelectTrigger
                    id="region"
                    className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                  >
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem
                        key={region}
                        value={region}
                        className="text-base sm:text-lg"
                      >
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && (
                  <p className="text-red-300 text-base">{errors.region}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="serviceAvailed"
                  className="text-white text-lg sm:text-xl"
                >
                  Service Availed
                </Label>
                <Input
                  id="serviceAvailed"
                  name="serviceAvailed"
                  placeholder="Enter the service availed"
                  value={formData.serviceAvailed}
                  onChange={handleInputChange}
                  className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 placeholder-white placeholder-opacity-50 h-12 text-base sm:text-lg"
                />
                {errors.serviceAvailed && (
                  <p className="text-red-300 text-base">
                    {errors.serviceAvailed}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="cc-survey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                  Customer Awareness Survey
                </h2>
                <p className="text-white text-base sm:text-lg">
                  Please answer the following questions about your awareness and
                  perception of the Citizen&apos;s Charter (CC) in this office.
                </p>

                <div className="space-y-2">
                  <Label
                    htmlFor="cc-awareness"
                    className="text-white text-lg sm:text-xl"
                  >
                    Which of the following best describes your awareness of a
                    CC?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleCCChange("awareness", value)
                    }
                    value={ccAnswers.awareness}
                  >
                    <SelectTrigger
                      id="cc-awareness"
                      className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {ccAwarenessOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option}
                          className="text-base sm:text-lg"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="cc-survey-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="cc-quality"
                    className="text-white text-lg sm:text-xl"
                  >
                    If aware of CC (answered 1-3 in CC1), would you say that the
                    CC of this office was...?
                  </Label>
                  <Select
                    onValueChange={(value) => handleCCChange("quality", value)}
                    disabled={ccAnswers.awareness === ccAwarenessOptions[3]}
                    value={ccAnswers.quality}
                  >
                    <SelectTrigger
                      id="cc-quality"
                      className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {ccQualityOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option}
                          className="text-base sm:text-lg"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cc-helpfulness"
                    className="text-white text-lg sm:text-xl"
                  >
                    If aware of CC (answered codes 1-3 in CC1), how much did the
                    CC help you in your transaction?
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleCCChange("helpfulness", value)
                    }
                    disabled={ccAnswers.awareness === ccAwarenessOptions[3]}
                    value={ccAnswers.helpfulness}
                  >
                    <SelectTrigger
                      id="cc-helpfulness"
                      className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-50 h-12 text-base sm:text-lg"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {ccHelpfulnessOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option}
                          className="text-base sm:text-lg"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ccHelpfulness && (
                    <p className="text-red-300 text-base">
                      {errors.ccHelpfulness}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step > 2 && step <= questions.length + 2 && (
            <motion.div
              key={`question-${step - 2}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white">
                {questions[step - 3]}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {likertScale.map((option) => (
                  <Button
                    key={option}
                    variant={
                      answers[step - 3] === option ? "secondary" : "outline"
                    }
                    className={`w-full justify-start text-left h-12 text-base sm:text-lg ${
                      answers[step - 3] === option
                        ? "bg-white text-blue-500"
                        : "bg-white bg-opacity-20 text-white border-white border-opacity-50 hover:bg-white hover:text-blue-500"
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {step > questions.length + 2 && (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Thank You!
              </h2>
              <p className="text-lg sm:text-xl text-white">
                Your feedback is valuable to us. We appreciate your time in
                completing this survey.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {step > 0 && step <= questions.length + 2 && (
            <Button
              onClick={prevStep}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-500 h-12 text-base sm:text-lg"
            >
              Previous
            </Button>
          )}
          {step <= questions.length + 2 && (
            <Button
              onClick={nextStep}
              className="ml-auto bg-white text-blue-500 hover:bg-blue-100 h-12 text-base sm:text-lg"
            >
              {step === 0
                ? "Start Survey"
                : step === questions.length + 2
                ? "Finish"
                : "Next"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
