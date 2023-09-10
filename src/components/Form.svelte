<script lang="ts">
  $: responseMessage = "";
  $: responseError = "";

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(
        () =>
          (responseMessage =
            "Form Submitted! Expect To Hear From Us Within 48 hours.")
      )
      .catch(
        (error) =>
          (responseError =
            "Could Not Send The Email, Please send us an email manually via boristofu@gmail.com")
      );
  }
</script>

<!-- <form on:submit={submit} class="form region"> -->
<form
  name="contact"
  method="POST"
  on:submit={submit}
  data-netlify="true"
  class="form region"
>
  <div class="form__input-block">
    <input
      required
      class="form__input"
      type="text"
      placeholder="שם מלא"
      name="name"
      id="input_name"
    />
    <label class="form__label" for="input_name">
      שם מלא
      <span>*</span>
    </label>
  </div>
  <div class="form__input-block">
    <input
      required
      class="form__input"
      type="text"
      placeholder="שם החברה"
      name="company"
      id="input_company"
    />
    <label class="form__label" for="input_company">
      שם החברה
      <span>*</span>
    </label>
  </div>
  <div class="form__input-block">
    <input
      required
      class="form__input"
      type="email"
      placeholder="dahan.nir@gmail.com"
      name="email"
      id="input_email"
    />
    <label class="form__label" for="input_email">
      אימייל
      <span>*</span>
    </label>
  </div>
  <div class="form__input-block">
    <input
      required
      class="form__input"
      placeholder="מספר טלפון"
      type="tel"
      name="phone"
    />
    <label class="form__label" for="input_phone">
      מס׳ טלפון
      <span>*</span>
    </label>
  </div>
  <div class="form__input-block form__input--last">
    <input
      class="form__input"
      type="text"
      name="message"
      placeholder="כמה מילים על הפרויקט"
      id="input_message"
    />
    <label class="form__label" for="input_message">
      כמה מילים על הפרויקט
    </label>
  </div>
  <a href="https://wa.me/+972508564794" class="form__whatsapp text-step--1">
    * לנוחיותכם, ניתן לשלוח הודעת WhatsApp
  </a>
  <button type="submit">שלח פרטים</button>
</form>
{#if responseMessage}
  <div>
    <pre>{responseMessage}</pre>
    {#if responseError}
      <div>
        <pre>{responseError}</pre>
      </div>
    {/if}
  </div>
{/if}
