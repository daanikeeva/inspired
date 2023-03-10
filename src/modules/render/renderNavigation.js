import { createElement } from "../createElement";
import { dataNavigation } from "../dataNavigation";

export const renderNavigation = (gender) => {
  const navigation = document.querySelector(".navigation");

  navigation.textContent = "";

  const container = createElement(
    "div",
    {
      className: "container",
    },
    {
      parent: navigation,
    }
  );

  const genderList = createElement(
    "ul",
    {
      className: "navigation__gender gender",
    },
    {
      parent: container,
    }
  );

  for (const genderName in dataNavigation) {
    createElement(
      "a",
      {
        className: `gender__link
        ${gender === genderName ? "gender__link_active" : ""}`,
        href: `#/${genderName}`,
        textContent: dataNavigation[genderName].title,
      },
      {
        parent: createElement(
          "li",
          {
            className: "gender__item",
          },
          {
            parent: genderList,
          }
        ),
      }
    );
  }

  const categoryElems = dataNavigation[gender].list.map((elem) =>
    createElement(
      "li",
      {
        className: "category__item",
      },
      {
        append: createElement(
          "a",
          {
            className: "category__link",
            textContent: elem.title,
            href: `#/${gender}/${elem.slug}`,
          },
          {
            cb(e) {
              e.addEventListener("click", () => {
                document
                  .querySelector(".category__link_active")
                  ?.classList.remove("category__link_active");
                e.classList.add("category__link_active");
              });
            },
          }
        ),
      }
    )
  );

  createElement(
    "ul",
    {
      className: "navigation__category category",
    },
    {
      parent: container,
      appends: categoryElems,
    }
  );
};
