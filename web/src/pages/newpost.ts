import { newEvent } from "../account/newEvent";
import { whenReady } from "../util/whenReady";

function getTimestampFromDateTime(date: string, time: string): number {
  return new Date(date + " " + time).getTime();
}

whenReady(() => {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const desciptionInput = document.getElementById(
    "description"
  ) as HTMLTextAreaElement;
  const locationInput = document.getElementById("location") as HTMLInputElement;
  const zipcodeInput = document.getElementById("zipcode") as HTMLInputElement;
  const dateInput = document.getElementById("date") as HTMLInputElement;
  const startTimeInput = document.getElementById(
    "starttime"
  ) as HTMLInputElement;
  const endTimeInput = document.getElementById("endtime") as HTMLInputElement;

  const isWorkshop = document.getElementById("sub1") as HTMLInputElement;
  const isCampaign = document.getElementById("sub2") as HTMLInputElement;
  const isSeminar = document.getElementById("sub3") as HTMLInputElement;
  const isMisc = document.getElementById("sub4") as HTMLInputElement;

  const submitButton = document.getElementById("submit") as HTMLButtonElement;
  const cancelButton = document.getElementById("cancel") as HTMLButtonElement;

  function showWarning(text: string): void {
    const warning = document.getElementById("warningtext") as HTMLDivElement;
    warning.style.display = "block";
    warning.innerText = text;
  }

  submitButton.addEventListener("click", async () => {
    const title = titleInput.value;
    const description = desciptionInput.value;
    const location = locationInput.value;
    const zipcode = parseInt(zipcodeInput.value);

    const date = dateInput.value;
    const startTime = getTimestampFromDateTime(date, startTimeInput.value);
    const endTime = getTimestampFromDateTime(date, endTimeInput.value);

    const tags: string[] = [];
    if (isWorkshop.checked) tags.push("workshop");
    if (isCampaign.checked) tags.push("campaign");
    if (isSeminar.checked) tags.push("seminar");
    if (isMisc.checked) tags.push("misc");

    try {
      const eventid = await newEvent(
        title,
        description,
        startTime,
        endTime,
        location,
        zipcode,
        tags
      );
      //TODO: redirect to event page
      console.log(eventid);
    } catch (error: any) {
      //401
      if (error.message === "Invalid argument") {
        showWarning("Invalid argument");
      }

      //500
      else {
        showWarning("Could not create event");
      }
    }
  });

  cancelButton.addEventListener("click", () => {
    //TODO: redirect to forums page
    window.location.href = "/";
  });
});
