import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as types from '@babel/types';

import fs from 'fs';

const code = fs.readFileSync('./test.type.ts').toString('utf-8');

const ast = parser.parse(code, {
  plugins: ['typescript'],
  tokens: true,
});

class TypeNode {
  private name: string;
  private members: Array<{ key: string; type: string }>;
  constructor(name, members) {
    this.name = name;
    this.members = members;
  }
}

const mapKeyword = {
  TSStringKeyword: 'string',
  TSNumberKeyword: 'number',
  TSBooleanKeyword: 'boolean',
};

const typesNeedChange = [];
function getNodeComments(node) {
  let comment = '';
  // 前置
  if (node.leadingComments && node.leadingComments.length) {
    comment = `${node.leadingComments[node.leadingComments.length - 1].value}`;
  }

  if (node.trailingComments && node.trailingComments.length) {
    comment = `${node.trailingComments[0].value}`;
  }

  return comment;
}

function collection(node) {
  const members = [];
  for (let member of node.typeAnnotation.members) {
    members.push({
      key: member.key.name,
      type:
        member.typeAnnotation.typeAnnotation.typeName?.name ||
        mapKeyword[member.typeAnnotation.typeAnnotation.type],
      comment: getNodeComments(member),
    });
  }
  let typeNode = new TypeNode(node.id.name, members);
  typesNeedChange.push(typeNode);
}

traverse(ast, {
  enter(path) {
    if (types.isTSTypeAliasDeclaration(path.node)) {
      collection(path.node);
    }
  },
});

console.log(JSON.stringify(typesNeedChange));

fs.writeFileSync('./t.json', JSON.stringify(ast));
