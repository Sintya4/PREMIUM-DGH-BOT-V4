/* Button Style Object */
const types = {
  blurple: 1,
  grey: 2,
  green: 3,
  red: 4
}

/**
 * Message Buttons Class
 * Helps to build the button
 */
class SlashButton {
  constructor(data={}) {
    /**
     * Type of the button
     * @type {Int}
     */
    this.type = 2,

    /**
     * If button should be disabled
     * @type {Boolean}
     */
    this.disabled = data.disabled || false,

    /**
     * Style of the button
     * @type {String}
     */
    this.style = data.style || 2,

    /**
     * Text that will display on button
     * @type {String}
     */
    this.label = data.label || null,

    /**
     * Emoji if wanted to add in button
     * @type {Emoji}
     */
    this.emoji = data.emoji || null,

    /**
     * Id of the button
     * @type {String}
     */
    this.custom_id = data.id || null, 
    this.url = data.url || null
  }
 
 /**
  * Set the label of the button
  * @param {String} label text that will display on button
  */
  setLabel(label) {
    this.label = label;
    return this;
  }

/**
 * Set the style of the button [ availabe optons are: blurple, green, red, grey ] 
 * @param {String} style
 */
  setStyle(style) {
    if(!types[style]) throw new Error("Invalid style name, please read documentation")
    this.style = types[style] || 2
    return this;
  }

/**
 * Set emoji for the button
 * @param {emojo} 
 */
  setEmoji(emoji) {
    this.emoji = emoji
    return this;
  }

  /**
   * Set the button ID (not required if the button is link type)
   * @param {String} 
   */
  setID(id) {
    if(this.url) throw new Error("You can not set ID while using link button")
    this.custom_id = id
    return this;
  }

 /**
  * Set the URL for the button if it is link type
  * @param {String} link 
  */
  setURL(link) {
    this.style = 5;
    this.url = link
    return this;
  }

/**
 * Disable the button
 */
  setDisable() {
    this.disabled = true;
    return this;
  }
}

module.exports = SlashButton
