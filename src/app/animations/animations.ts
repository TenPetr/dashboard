import { trigger, transition, style, animate } from "@angular/animations";

export let fade = trigger("fade", [
  transition("void => *", [
    style({ opacity: 0, transform: "translateY(8%)" }),
    animate("600ms ease-in-out")
  ])
]);

export let textFade = trigger("textFade", [
  transition("void => *", [
    style({ opacity: 0, transform: "translateX(-30px)" }),
    animate(
      "800ms ease-in-out",
      style({ opacity: 1, transform: "translateX(0)" })
    )
  ])
]);
