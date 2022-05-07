import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("Shoud be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Está tudo bugado MDS :O",
        screenshot: "data:image/png;base64ashdjabshdvkjafbvla",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it("Shoud not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Está tudo bugado MDS :O",
        screenshot: "data:image/png;base64ashdjabshdvkjafbvla",
      })
    ).rejects.toThrow();
  });

  it("Shoud not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64ashdjabshdvkjafbvla",
      })
    ).rejects.toThrow();
  });

  it("Shoud not be able to submit a feedback without a invalid image format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Está tudo bugado MDS :O",
        screenshot: "image.png",
      })
    ).rejects.toThrow();
  });
});
