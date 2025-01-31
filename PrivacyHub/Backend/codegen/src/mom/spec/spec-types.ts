/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Specification } from "@project-chip/matter.js/model";

/**
 * An HTML table
 */
export type Table = {
    /** Field names */
    fields: string[];

    /** Column name -> defining HTML element */
    rows: { [name: string]: HTMLElement | undefined }[];

    /** Single-cell rows, tend to be informational */
    notes: HTMLElement[];
};

/**
 * A reference to a specific portion of the specification.  Captures details
 * as raw HTML DOM nodes from the Matter specification
 */
export type HtmlReference = {
    xref: Specification.CrossReference;
    name: string;
    path: string;
    table?: Table;
    prose?: HTMLElement[];
    detailSection?: string;
    details?: HtmlReference[];
};

/**
 * Intermediate representation of a cluster.  Has all the bits we think we'll
 * need but still encoded as ugly HTML
 */
export type ClusterReference = HtmlReference & {
    ids?: HtmlReference;
    revisions?: HtmlReference;
    classifications?: HtmlReference;
    features?: HtmlReference;
    attributes?: HtmlReference;
    attributeSets?: HtmlReference[];
    commands?: HtmlReference;
    events?: HtmlReference;
    statusCodes?: HtmlReference;
    datatypes?: HtmlReference[];
};

/**
 * Intermediate representation of a device.
 */
export type DeviceReference = HtmlReference & {
    category?: string;
    classification?: HtmlReference;
    revisions?: HtmlReference;
    conditionSets?: HtmlReference[];
    clusters?: HtmlReference;
    elements?: HtmlReference;
};
