import { Field } from "@base-ui/react";
import { useForm } from "@tanstack/react-form";
import z from "zod";

import { TextInput } from "#/components/form/text-input";
import { Button } from "#/components/ui/button";

import { fetchVideoInformation, type VideoInformation } from "./fetch-video-information";

type FetchVideoFormProps = Readonly<{
  onReceiveVideoInformation: (videoInformation: VideoInformation) => void;
}>;

const formSchema = z.object({
  videoId: z.string().nonempty(),
});

export function FetchVideoForm({ onReceiveVideoInformation }: FetchVideoFormProps) {
  const form = useForm({
    defaultValues: {
      videoId: "",
    },
    validators: {
      onChange: formSchema,
    },
    onSubmit: async (form) => {
      onReceiveVideoInformation(await fetchVideoInformation(form.value.videoId));
    },
  });
  return (
    <form className="flex flex-col gap-4">
      <form.Field
        name="videoId"
        children={(field) => (
          <Field.Root
            className="flex flex-col gap-2"
            name={field.name}
            invalid={!field.state.meta.isValid}
            dirty={field.state.meta.isDirty}
            touched={field.state.meta.isTouched}
          >
            <Field.Label>YouTube Video ID</Field.Label>
            <TextInput
              value={field.state.value}
              onValueChange={field.handleChange}
              onBlur={field.handleBlur}
            />
            <Field.Error match={!field.state.meta.isValid}>
              {field.state.meta.errors.map((e) => e?.message).join(",")}
            </Field.Error>
          </Field.Root>
        )}
      />
      <Button type="submit" onClick={() => form.handleSubmit()}>
        Fetch Video
      </Button>
    </form>
  );
}
