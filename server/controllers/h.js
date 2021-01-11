const Async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');  
const Skills = require("../../models/skills.model");
const codeBits = require("../../lib/code.bits");

 
 