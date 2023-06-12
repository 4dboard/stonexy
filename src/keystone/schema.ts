import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {text, timestamp} from "@keystone-6/core/fields";
import {document} from "@keystone-6/fields-document";
import type {Lists} from ".keystone/types";

export const lists: Lists = {
    User: list({
        access: allowAll,

        fields: {
            name: text({validation: {isRequired: true}}),
            about: document({
                formatting: true,
                dividers: true,
                links: true,
                layouts: [
                    [1, 1],
                    [1, 1, 1],
                ],
            }),
            createdAt: timestamp({
                defaultValue: {kind: "now"},
            }),
        },
    }),
};
