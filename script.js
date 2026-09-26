/*=================================
      VENDORBRIDGE JAVASCRIPT
==================================*/


/*=================================
      CONTACT FORM
==================================*/

const contactForm = document.querySelector("#contact form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = contactForm.querySelector(
            'input[type="text"]'
        );

        const email = contactForm.querySelector(
            'input[type="email"]'
        );

        const phone = contactForm.querySelector(
            'input[type="tel"]'
        );

        const subject = contactForm.querySelector(
            'select'
        );

        const company = contactForm.querySelectorAll(
            'input[type="text"]'
        )[1];

        const date = contactForm.querySelector(
            'input[type="date"]'
        );

        const message = contactForm.querySelector(
            'textarea'
        );


        /*=================================
              FORM VALIDATION
        =================================*/

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            phone.value.trim() === "" ||
            subject.value === "" ||
            company.value.trim() === "" ||
            date.value === "" ||
            message.value.trim() === ""
        ) {

            alert("Please fill all required fields.");

            return;
        }


        /*=================================
              EMAIL VALIDATION
        =================================*/

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            alert("Please enter a valid email address.");

            return;
        }


        /*=================================
              PHONE VALIDATION
        =================================*/

        const phonePattern =
            /^[0-9]{10}$/;

        if (!phonePattern.test(phone.value)) {

            alert("Please enter a valid 10-digit phone number.");

            return;
        }


        /*=================================
              SUCCESS MESSAGE
        =================================*/

        alert(
            "Message sent successfully!\n\n" +
            "Thank you, " + name.value + "."
        );


        /*=================================
              CLEAR FORM
        =================================*/

        contactForm.reset();

    });

}


/*=================================
          RESET BUTTON
==================================*/

const resetButton =
    contactForm?.querySelector(
        'button[type="reset"]'
    );

if (resetButton) {

    resetButton.addEventListener(
        "click",
        function() {

            alert("Form has been reset.");

        }
    );

}


/*=================================
          FILE VALIDATION
==================================*/

const fileInput =
    contactForm?.querySelector(
        'input[type="file"]'
    );

if (fileInput) {

    fileInput.addEventListener(
        "change",
        function() {

            const file = fileInput.files[0];

            if (!file) {
                return;
            }

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/jpeg",
                "image/png"
            ];

            if (!allowedTypes.includes(file.type)) {

                alert(
                    "Invalid file type.\n" +
                    "Please upload PDF, DOC, DOCX, JPG or PNG."
                );

                fileInput.value = "";

                return;
            }


            /* Maximum file size: 5 MB */

            const maxSize = 5 * 1024 * 1024;

            if (file.size > maxSize) {

                alert(
                    "File size should not exceed 5 MB."
                );

                fileInput.value = "";

                return;
            }

        }
    );

}


/*=================================
          NAVBAR SCROLL
==================================*/

window.addEventListener(
    "scroll",
    function() {

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.4)";

        } else {

            navbar.style.boxShadow =
                "0 5px 15px rgba(0,0,0,.3)";

        }

    }
);


/*=================================
       SMOOTH NAVIGATION
==================================*/

const navLinks =
    document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

navLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        }
    );

});


/*=================================
       CURRENT YEAR
==================================*/

const yearElement =
    document.querySelector(
        "#currentYear"
    );

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/*=================================
       PAGE LOADED
==================================*/

console.log(
    "VendorBridge JavaScript loaded successfully."
);