import './form-master.js';
import './photo-editor.js';
import './photo-viewer.js';
import './upload-master.js';
import './view-filter.js';

import { createDescriptionArr } from './testdata-generator.js';
import { renderThumbnails } from './thumbnails.js';

renderThumbnails(createDescriptionArr(25));
