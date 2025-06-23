import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit"; 

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext)

  const [formState, formAction, pending] = useActionState(formOpinionHandler, { errors: null });

  async function formOpinionHandler(prevFormData, formData) {
    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let error = null

    if (userName.trim().length < 3 || title.trim().length < 3 || body.trim().length < 3) { // trim() remove WhiteSpaces
      error = 'invalid data entered'
    }

    if (error) {
      return {
        error, enteredValues: {
          userName, title, body
        }
      }
    }

    if (!error) {
      await addOpinion({ title, body, userName })
      return { errors: null }
    }

  }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState?.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState?.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState?.enteredValues?.body}></textarea>
        </p>

        {/* <Submit /> */}  {/* Variante 1 -> wir haben eine Externe Button Component und greifen über useFormStatus auf den Pending Status zu */}

        <p className="actions">
          <button type="submit" disabled={pending}> {/* Variante 2 -> wir nutzen das FormActions Pending Element */}
            {pending ? "Submitting..." : "Submit"}
          </button>
        </p>

        {formState?.error && <ul className="errors">
          <li> {formState.error}</li>
        </ul>}
      </form>
    </div>
  );
}
